import express from 'express';
import odbc from 'odbc';
const app = express();
const PORT = 3000;

// Your ODBC connection string
const connectionString = "DSN=B4799;UID=VSAUSER;PWD=VSAUSER";

// Middleware to parse JSON data
app.use(express.json());

// API endpoint to write phone number data to the Gemini database
app.post('/writeGemini', async (req, res) => {
  const { phoneNumber } = req.body; // Extract phone number from request body

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const insertQuery = `INSERT INTO RENCDBDTA.RSTEST (PHONENB) VALUES (?)`;

  try {
    // Connect to the database
    const db = await odbc.connect(connectionString);

    // Execute the insert query with the phone number
    await db.query(insertQuery, [phoneNumber]);

    // Close the database connection
    await db.close();

    // Send a success response
    res.status(201).json({ message: 'Phone number added successfully.' });
  } catch (error) {
    console.error('Error writing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
