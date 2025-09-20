// backend/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Load .env variables
const axios = require('axios');

// -----------------------------
// Import routes
// -----------------------------
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatbotRoutes = require('./routes/chatbot');

// -----------------------------
// Initialize app
// -----------------------------
const app = express();

// -----------------------------
// Security & Middleware
// -----------------------------
app.use(helmet()); // Secure headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://neuro-net-tau.vercel.app/',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit per IP
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Database Connection
// -----------------------------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// -----------------------------
// Routes
// -----------------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Chatbot route: forwards requests to Python ML service
app.use('/api/chatbot', async (req, res, next) => {
  if (req.method === 'POST') {
    try {
      const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001/predict';
      const response = await axios.post(mlServiceUrl, req.body);
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
});

// -----------------------------
// Health check
// -----------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    backend: 'Node.js/Express',
  });
});

// -----------------------------
// 404 handler
// -----------------------------
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// -----------------------------
// Error handling
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// -----------------------------
// Start server
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
