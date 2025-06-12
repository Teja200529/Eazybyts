const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Make sure path is correct

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Test route
app.get('/test', (req, res) => {
  const now = new Date();
  const formattedDateTime = now.toISOString().replace('T', ' ').slice(0, 19);
  res.send(
    `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${formattedDateTime}\nCurrent User's Login: Teja200529`
  );
});

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/test`);
});
