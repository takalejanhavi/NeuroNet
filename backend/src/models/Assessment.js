const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['PHQ-9', 'GAD-7'],
    required: true
  },
  responses: {
    type: Map,
    of: Number,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    enum: ['minimal', 'mild', 'moderate', 'moderately-severe', 'severe'],
    required: true
  },
  recommendations: [String],
  isAnonymous: {
    type: Boolean,
    default: true
  },
  triggerCrisisAlert: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);