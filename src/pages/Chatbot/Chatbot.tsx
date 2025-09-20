import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from '@mui/material';
import { Send, Psychology, Person, Warning } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'assessment' | 'normal' | 'crisis';
}

interface PHQResponse {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [phqResponses, setPhqResponses] = useState<PHQResponse>({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0
  });
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const phqQuestions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly, or being restless",
    "Thoughts that you would be better off dead or hurting yourself"
  ];

  const responseOptions = [
    "Not at all (0)",
    "Several days (1)",
    "More than half the days (2)",
    "Nearly every day (3)"
  ];

  useEffect(() => {
    // Initial bot message
    const initialMessage: Message = {
      id: '1',
      content: `Hello ${user?.name}! I'm your AI mental health companion. I'm here to provide support, conduct assessments, and help you navigate your mental wellness journey. How are you feeling today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'normal'
    };
    setMessages([initialMessage]);
  }, [user?.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('assessment') || lowerMessage.includes('phq') || lowerMessage.includes('test')) {
      return "I'd be happy to help you with a mental health assessment. The PHQ-9 is a standardized questionnaire that helps evaluate depression symptoms. Would you like to start the assessment now?";
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      return "I understand you're feeling anxious. Anxiety is a common experience, especially among students. Some helpful techniques include deep breathing exercises, grounding techniques (5-4-3-2-1 method), and progressive muscle relaxation. Would you like me to guide you through a breathing exercise, or would you prefer to take a formal assessment?";
    }
    
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling this way. Depression can feel overwhelming, but remember that seeking help is a sign of strength. Some strategies that can help include maintaining a daily routine, getting sunlight, staying connected with others, and engaging in activities you used to enjoy. Would you like to complete a PHQ-9 assessment to better understand your symptoms?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Academic stress is very common among students. Here are some evidence-based strategies: break large tasks into smaller ones, practice time management, use the Pomodoro technique, maintain work-life balance, and don't forget self-care. Would you like specific tips for any of these areas, or would you prefer to explore your stress levels through an assessment?";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return "Sleep issues can significantly impact mental health. Good sleep hygiene includes: keeping a consistent sleep schedule, avoiding screens 1 hour before bed, creating a relaxing bedtime routine, and keeping your bedroom cool and dark. If sleep problems persist, this could be a symptom of depression or anxiety. Would you like to take an assessment?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('crisis') || lowerMessage.includes('emergency')) {
      return "If you're experiencing a mental health crisis, please reach out for immediate help: National Suicide Prevention Lifeline: 988, Crisis Text Line: Text HOME to 741741, or contact your local emergency services at 911. I'm here to support you, but professional help may be needed for crisis situations.";
    }
    
    return "I'm here to listen and support you. Whether you're dealing with stress, anxiety, depression, or just need someone to talk to, I can help. I can also conduct formal mental health assessments like the PHQ-9. What would be most helpful for you right now?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    simulateTyping();

    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        type: 'normal'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentSubmit = async () => {
    const totalScore = Object.values(phqResponses).reduce((sum, score) => sum + score, 0);
    
    let severity = '';
    let recommendation = '';
    
    if (totalScore <= 4) {
      severity = 'Minimal';
      recommendation = 'Your responses suggest minimal depressive symptoms. Continue with healthy lifestyle habits and self-care practices.';
    } else if (totalScore <= 9) {
      severity = 'Mild';
      recommendation = 'Your responses suggest mild depressive symptoms. Consider lifestyle changes, stress management, and monitoring your mood. If symptoms persist, consider speaking with a counselor.';
    } else if (totalScore <= 14) {
      severity = 'Moderate';
      recommendation = 'Your responses suggest moderate depressive symptoms. I strongly recommend scheduling an appointment with one of our counselors for professional support.';
    } else if (totalScore <= 19) {
      severity = 'Moderately Severe';
      recommendation = 'Your responses suggest moderately severe depressive symptoms. Please schedule an appointment with a counselor as soon as possible. You may also want to speak with your healthcare provider.';
    } else {
      severity = 'Severe';
      recommendation = 'Your responses suggest severe depressive symptoms. This requires immediate attention. Please schedule an urgent appointment with a counselor and consider contacting your healthcare provider or a mental health crisis line.';
    }

    const assessmentMessage: Message = {
      id: Date.now().toString(),
      content: `PHQ-9 Assessment Results:\n\nScore: ${totalScore}/27\nSeverity: ${severity}\n\n${recommendation}`,
      sender: 'bot',
      timestamp: new Date(),
      type: totalScore >= 15 ? 'crisis' : 'assessment'
    };

    setMessages(prev => [...prev, assessmentMessage]);
    setShowAssessment(false);
    
    // Reset responses
    setPhqResponses({
      q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        AI Mental Health Companion
      </Typography>
      
      <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '80%' }}>
                {message.sender === 'bot' && (
                  <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                    <Psychology />
                  </Avatar>
                )}
                
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: message.sender === 'user' ? 'primary.main' : message.type === 'crisis' ? 'error.light' : 'grey.100',
                    color: message.sender === 'user' ? 'white' : message.type === 'crisis' ? 'white' : 'text.primary',
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {message.content}
                  </Typography>
                  {message.type === 'crisis' && (
                    <Chip
                      icon={<Warning />}
                      label="Crisis Alert"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                  {message.sender === 'bot' && !showAssessment && message.content.includes('assessment') && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleStartAssessment}
                      sx={{ mt: 1, ml: 1 }}
                    >
                      Start PHQ-9 Assessment
                    </Button>
                  )}
                </Paper>
                
                {message.sender === 'user' && (
                  <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>
                    <Person />
                  </Avatar>
                )}
              </Box>
            </Box>
          ))}
          
          {isTyping && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                <Psychology />
              </Avatar>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  AI is typing...
                </Typography>
              </Paper>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Message Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'grey.300' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              variant="outlined"
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              sx={{ ml: 1 }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* PHQ-9 Assessment Dialog */}
      <Dialog open={showAssessment} onClose={() => setShowAssessment(false)} maxWidth="md" fullWidth>
        <DialogTitle>PHQ-9 Depression Assessment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Over the last 2 weeks, how often have you been bothered by any of the following problems?
          </Typography>
          
          {phqQuestions.map((question, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                {index + 1}. {question}
              </Typography>
              <Slider
                value={phqResponses[`q${index + 1}` as keyof PHQResponse]}
                onChange={(_, value) => setPhqResponses(prev => ({
                  ...prev,
                  [`q${index + 1}`]: value as number
                }))}
                step={1}
                marks
                min={0}
                max={3}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => responseOptions[value]}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                {responseOptions.map((option, optionIndex) => (
                  <Typography key={optionIndex} variant="caption" color="text.secondary">
                    {option}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAssessment(false)}>Cancel</Button>
          <Button onClick={handleAssessmentSubmit} variant="contained">
            Submit Assessment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chatbot;