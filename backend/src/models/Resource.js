const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'audio', 'article', 'document'],
    required: true
  },
  category: {
    type: String,
    enum: ['anxiety', 'depression', 'stress', 'sleep', 'mindfulness', 'academic', 'general'],
    required: true
  },
  language: {
    type: String,
    enum: ['english', 'spanish', 'french', 'hindi'],
    default: 'english'
  },
  fileUrl: String,
  fileSize: Number,
  duration: String, // For audio/video
  readingTime: String, // For articles
  tags: [String],
  thumbnailUrl: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);