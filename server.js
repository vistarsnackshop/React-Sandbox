import express from 'express';
import readGeminiRoute from './src/api/readGeminiApi.js'
import writeGeminiRoute from './src/api/writeGeminiApi.js'
import readSqlRoute from './src/api/readSqlApi.js'
import writeSqlRoute from './src/api/writeSqlApi.js'


const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the routes
app.use(readGeminiRoute);
app.use(writeGeminiRoute);
app.use(writeSqlRoute);
app.use(readSqlRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
