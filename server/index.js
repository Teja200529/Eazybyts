import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contact.js';   // Contact form route
import profileRoutes from './routes/profile.js';   // About Me + Skills combined route (if still used)
import aboutMeRoutes from './routes/aboutme.js';   // Separate About Me route

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);     // existing combined route (optional)
app.use('/api/aboutme', aboutMeRoutes);     // NEW separate About Me route

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
