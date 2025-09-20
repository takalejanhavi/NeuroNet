// backend/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Load .env variables

// Import routes (ensure these files exist)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
//const appointmentRoutes = require('./routes/appointments');
//const forumRoutes = require('./routes/forum');
//const resourceRoutes = require('./routes/resources');
const chatbotRoutes = require('./routes/chatbot');
//const adminRoutes = require('./routes/admin');

const app = express();

// -----------------------------
// Security & Middleware
// -----------------------------
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Database Connection
// -----------------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://janhavit:database@mernecom.igrid.mongodb.net/mental-health-app?retryWrites=true&w=majority', {
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
//app.use('/api/appointments', appointmentRoutes);
//app.use('/api/forum', forumRoutes);
//app.use('/api/resources', resourceRoutes);
app.use('/api/chatbot', chatbotRoutes);
//app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// -----------------------------
// Error handling
// -----------------------------
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
