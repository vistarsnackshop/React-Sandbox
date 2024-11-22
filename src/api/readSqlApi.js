import express from 'express';
import sql from 'mssql';
const router = express.Router();

// SQL Server configuration
const config = {
  user: 'svc_Portal_User',                  // SQL Server username
  password: 'eFKkQyd(U-F)ye4AAeXuZK',              // SQL Server password
  server: 'AZEVIMVSSDBWD01',          // Server address or IP (e.g., 'localhost', '192.168.1.1')
  database: 'Portal',         // Database name (e.g., 'SalesDB')
  options: {
    encrypt: true,                        // Enable for secure connections (e.g., for Azure SQL)
    trustServerCertificate: true,         // Use in dev if there's a certificate issue
  },
};

// Endpoint to fetch data based on name
router.post('/readSql', async (req, res) => {
    const { name } = req.body; // Extract the name from the request body

    try {
      const pool = await sql.connect(config);
      // Query to fetch data from the SQL database using a parameterized query
      const result = await pool
        .request()
        .input('name', sql.NVarChar, name) // Bind the name parameter securely
        .query('SELECT * FROM ReactTest WHERE Name = @name');
  
      // Return the fetched data as a JSON response
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).send('Server error'); // Return a 500 status for server errors
    } finally {
      sql.close(); // Ensure the database connection is closed
    }
  });
  
export default router;
  
