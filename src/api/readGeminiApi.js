import express from 'express';
import odbc from 'odbc';
const app = express();

// Define the ODBC connection string
const connectionString = "DSN=B4799;UID=VSAUSER;PWD=VSAUSER";

// Function to fetch bid items data from the database
async function fetchData() {
  const readGeminiQuery = "select * from RENCDBDTA.RSTEST";
  try {
    // Connect to the database
    const db = await odbc.connect(connectionString);

    // Execute the query to fetch bid items
    const geminiData = await db.query(readGeminiQuery);

    // Close the database connection
    await db.close();

    // Return the fetched items
    return geminiData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Define the GET endpoint to fetch data
app.get('/readGemini', async (req, res) => {
  try {
    // Fetch data from the database
    const data = await fetchData();
    // Send the fetched data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in API handler:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server on a specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
