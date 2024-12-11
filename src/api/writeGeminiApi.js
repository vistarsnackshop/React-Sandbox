// Import the required modules
import express from 'express'; // Express framework for handling server routes
import odbc from 'odbc';       // ODBC package for connecting to an ODBC data source

const router = express.Router(); // Create a router instance for grouping related routes

// Define the ODBC connection string with the DSN, username, and password
const connectionString = "DSN=B4799;UID=VSAUSER;PWD=VSAUSER";

// Define an API endpoint to handle POST requests to "/writeGemini"
router.post('/writeGemini', async (req, res) => {
  // Extract the phone number from the request body
  const { phoneNumber } = req.body;

  // Validate that a phone number was provided in the request
  if (!phoneNumber) {
    // Respond with a 400 Bad Request error if the phone number is missing
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  // SQL query to insert the phone number into the specified database table
  const insertQuery = `INSERT INTO RENCDBDTA.RSTEST (PHONENB) VALUES (?)`;

  try {
    // Establish a connection to the ODBC data source
    const db = await odbc.connect(connectionString);

    // Execute the insert query, passing the phone number as a parameter
    await db.query(insertQuery, [phoneNumber]);

    // Close the database connection after the operation is complete
    await db.close();

    // Respond with a 201 Created status and a success message
    res.status(201).json({ message: 'Phone number added successfully.' });
  } catch (error) {
    // Log any errors that occur during the operation
    console.error('Error writing data:', error);

    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router so it can be used in other parts of the application
export default router;
