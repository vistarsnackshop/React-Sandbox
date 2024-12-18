import express from 'express';
import path from 'path';
import readGeminiRoute from './src/api/readGeminiApi.js';
import writeGeminiRoute from './src/api/writeGeminiApi.js';
import readSqlRoute from './src/api/readSqlApi.js';
import writeSqlRoute from './src/api/writeSqlApi.js';

const app = express();
const PORT = 3001;

// Serve static files
app.use('/sandbox/dist', express.static(path.resolve('./dist')));

// Proxy API routes
app.use('/sandbox/src/api/readGemini', readGeminiRoute);
app.use('/sandbox/src/api/writeGemini', writeGeminiRoute);
app.use('/sandbox/src/api/readSql', readSqlRoute);
app.use('/sandbox/src/api/writeSql', writeSqlRoute);

// Serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
