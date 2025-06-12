// Use ES module imports
import express from 'express';
import cors from 'cors';

const app = express();

// Add cors middleware
app.use(cors());

// Test route with exact format
app.get('/test', (req, res) => {
  const now = new Date();
  const formattedDateTime = now.toISOString()
    .replace('T', ' ')
    .slice(0, 19);

  res.send(
    `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${formattedDateTime}\nCurrent User's Login: Teja200529`
  );
});

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
});