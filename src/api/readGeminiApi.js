// Import necessary modules
import express from 'express'; // Import Express framework for creating a web server
import odbc from 'odbc'; // Import ODBC package to interact with ODBC-compatible databases
const router = express.Router();

// Define the ODBC connection string
// Replace 'DSN', 'UID', and 'PWD' values with your database's Data Source Name, username, and password
const connectionString = "DSN=B4799;UID=VSAUSER;PWD=VSAUSER";

/**
 * Function to fetch data from the database based on the phone number.
 * @param {string} phoneNumber - The phone number used as a search parameter.
 * @returns {Promise<Array>} - A promise that resolves to the fetched data from the database.
 */
async function fetchData(phoneNumber) {
  // SQL query to fetch rows from the RSTEST table where the phone number matches the input
  const readGeminiQuery = `SELECT * FROM RENCDBDTA.RSTEST WHERE PHONENB = ?`;

  try {
    // Establish a connection to the database
    const db = await odbc.connect(connectionString);

    // Execute the query, substituting the `?` in the query with the provided phone number
    const geminiData = await db.query(readGeminiQuery, [phoneNumber]);

    // Close the database connection to free up resources
    await db.close();

    // Return the data fetched from the database
    return geminiData;
  } catch (error) {
    // Log an error message if something goes wrong during the database operation
    console.error('Error fetching data:', error);

    // Return an empty array as a fallback if the query fails
    return [];
  }
}

// Define a POST API endpoint at `/readGemini`
// This endpoint allows users to send a phone number to fetch corresponding database records
router.post('/readGemini', async (req, res) => {
  // Extract the phone number from the request body
  const { phoneNumber } = req.body;

  // Validate that a phone number is provided in the request
  if (!phoneNumber) {
    // Respond with a 400 status code (Bad Request) and an error message
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Call the fetchData function to get data for the provided phone number
    const data = await fetchData(phoneNumber);

    // Respond with the fetched data and a 200 status code (OK)
    res.status(200).json(data);
  } catch (error) {
    // Log an error message if something goes wrong in the API handler
    console.error('Error in API handler:', error);

    // Respond with a 500 status code (Internal Server Error) and an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;