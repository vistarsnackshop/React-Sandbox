// Importing the required modules
import express from 'express'; // Express framework for creating server routes
import sql from 'mssql';       // mssql package for connecting to and interacting with SQL Server

const router = express.Router(); // Create a router instance for defining and grouping routes

// SQL Server configuration
const config = {
  user: 'svc_Portal_User',            // Username for the SQL Server database
  password: 'eFKkQyd(U-F)ye4AAeXuZK', // Password for the SQL Server database
  server: 'AZEVIMVSSDBWD01',          // Server address or hostname where the database is hosted
  database: 'Portal',                 // Name of the database to connect to
  options: {
    encrypt: true,                    // Ensures secure connections (useful for Azure SQL and other secure setups)
    trustServerCertificate: true,     // Allows connections even if the server's SSL certificate isn't trusted (e.g., in dev)
  },
};

// Define an endpoint to handle POST requests to "/readSql"
router.post('/readSql', async (req, res) => {
  // Extracting the "name" field from the incoming request body
  const { name } = req.body;

  // Try block to handle the main logic and catch potential errors
  try {
    // Establish a connection to the SQL Server database using the configuration
    const pool = await sql.connect(config);

    // Use a parameterized query to fetch data securely (prevents SQL injection attacks)
    const result = await pool
      .request() // Create a new request object to interact with the database
      .input('name', sql.NVarChar, name) // Bind the "name" parameter to the query securely
      .query('SELECT * FROM ReactTest WHERE Name = @name'); // Query to fetch rows where "Name" matches the provided value

    // Send the fetched data (recordset) as a JSON response
    res.json(result.recordset);
  } catch (err) {
    // If an error occurs during the process, log it to the console
    console.error('Error fetching data:', err.message);

    // Send a 500 Internal Server Error response to indicate a server-side issue
    res.status(500).send('Server error');
  } finally {
    // Ensure that the database connection is closed, even if an error occurs
    sql.close();
  }
});

// Export the router so it can be used in other parts of the application
export default router;
