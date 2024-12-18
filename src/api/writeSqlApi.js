import express from 'express';
import sql from 'mssql';
const router = express.Router();

// SQL Server configuration
const config = {
    user: 'svc_Portal_User',                  // SQL Server username
    password: 'eFKkQyd(U-F)ye4AAeXuZK',              // SQL Server password
    server: 'AZEVIMVSSDBWD01.performance.pfgc.com',          // Server address or IP (e.g., 'localhost', '192.168.1.1')
    database: 'Portal',         // Database name (e.g., 'SalesDB')
    options: {
      encrypt: true,                        // Enable for secure connections (e.g., for Azure SQL)
      trustServerCertificate: true,         // Use in dev if there's a certificate issue
    },
  };

// POST endpoint to write name to SQL database
router.post('/writeSql', async (req, res) => {
  const { name } = req.body; // Extract the name from the request body

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const pool = await sql.connect(config);

    // Query to insert the name into the database
    await pool
      .request()
      .input('name', sql.NVarChar, name)
      .query('INSERT INTO ReactTest (Name) VALUES (@name)');

    // Respond with a success message
    res.status(200).json({ message: 'Name inserted successfully' });
  } catch (err) {
    console.error('Error writing name to database:', err.message);
    res.status(500).json({ error: 'Error writing name to database' });
  } finally {
    sql.close(); // Ensure the database connection is closed
  }
});

export default router;
