const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const Assessment = require('../models/Assessment');
const auth = require('../middleware/auth');

const router = express.Router();

// Chat with AI
router.post('/chat', auth, [
  body('message').trim().isLength({ min: 1 }).withMessage('Message cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    const userId = req.user.userId;

    // Simple rule-based response system
    const lowerMessage = message.toLowerCase();
    let response = '';

    if (lowerMessage.includes('assessment') || lowerMessage.includes('phq') || lowerMessage.includes('test')) {
      response = "I'd be happy to help you with a mental health assessment. The PHQ-9 is a standardized questionnaire that helps evaluate depression symptoms. Would you like to start the assessment now?";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      response = "I understand you're feeling anxious. Anxiety is a common experience, especially among students. Some helpful techniques include deep breathing exercises, grounding techniques (5-4-3-2-1 method), and progressive muscle relaxation. Would you like me to guide you through a breathing exercise?";
    } else if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      response = "I'm sorry you're feeling this way. Depression can feel overwhelming, but seeking help is a sign of strength. Some strategies that can help include maintaining a daily routine, getting sunlight, staying connected with others, and engaging in activities you used to enjoy. Would you like to complete a PHQ-9 assessment?";
    } else if (lowerMessage.includes('crisis') || lowerMessage.includes('emergency') || lowerMessage.includes('suicide')) {
      response = "If you're experiencing a mental health crisis, please reach out for immediate help: National Suicide Prevention Lifeline: 988, Crisis Text Line: Text HOME to 741741, or contact emergency services at 911. I'm here to support you, but professional help may be needed for crisis situations.";
    } else {
      response = "I'm here to listen and support you. Whether you're dealing with stress, anxiety, depression, or just need someone to talk to, I can help. I can also conduct formal mental health assessments like the PHQ-9. What would be most helpful for you right now?";
    }

    res.json({
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit PHQ-9 Assessment
router.post('/assessment/phq9', auth, [
  body('responses').isObject().withMessage('Responses must be an object'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { responses } = req.body;
    const userId = req.user.userId;

    // Calculate total score
    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);

    // Determine severity
    let severity = '';
    if (totalScore <= 4) severity = 'minimal';
    else if (totalScore <= 9) severity = 'mild';
    else if (totalScore <= 14) severity = 'moderate';
    else if (totalScore <= 19) severity = 'moderately-severe';
    else severity = 'severe';

    // Generate recommendations
    const recommendations = [];
    if (severity === 'minimal') {
      recommendations.push('Continue with healthy lifestyle habits and self-care practices.');
    } else if (severity === 'mild') {
      recommendations.push('Consider lifestyle changes and stress management techniques.');
      recommendations.push('Monitor your mood and consider speaking with a counselor if symptoms persist.');
    } else if (severity === 'moderate') {
      recommendations.push('I strongly recommend scheduling an appointment with one of our counselors.');
      recommendations.push('Consider implementing daily mood tracking and self-care routines.');
    } else {
      recommendations.push('Please schedule an appointment with a counselor as soon as possible.');
      recommendations.push('Consider contacting your healthcare provider or a mental health crisis line.');
    }

    // Save assessment
    const assessment = new Assessment({
      student: userId,
      type: 'PHQ-9',
      responses: new Map(Object.entries(responses)),
      totalScore,
      severity,
      recommendations,
      triggerCrisisAlert: totalScore >= 15
    });

    await assessment.save();

    // Try to call ML service for prediction
    try {
      const mlResponse = await axios.post('http://localhost:5000/predict', responses);
      if (mlResponse.data.severity) {
        assessment.severity = mlResponse.data.severity.toLowerCase();
        await assessment.save();
      }
    } catch (mlError) {
      console.log('ML service unavailable, using rule-based assessment');
    }

    res.json({
      score: totalScore,
      severity,
      recommendations,
      triggerCrisisAlert: totalScore >= 15
    });
  } catch (error) {
    console.error('Assessment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;