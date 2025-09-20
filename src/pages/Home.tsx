import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Psychology,
  Support,
  School,
  HealthAndSafety,
  Chat,
  CalendarToday,
  LibraryBooks,
  Forum,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Chat />,
      title: 'AI-Powered Support',
      description: 'Get immediate help with our intelligent chatbot trained on PHQ-9 and GAD-7 assessments.',
      link: '/chatbot',
      color: '#1565C0',
    },
    {
      icon: <CalendarToday />,
      title: 'Book Appointments',
      description: 'Schedule confidential sessions with qualified counselors at your convenience.',
      link: '/appointments',
      color: '#2E7D32',
    },
    {
      icon: <LibraryBooks />,
      title: 'Resource Library',
      description: 'Access psychoeducational materials, videos, and audio guides in multiple languages.',
      link: '/resources',
      color: '#F57C00',
    },
    {
      icon: <Forum />,
      title: 'Peer Support',
      description: 'Connect with fellow students in a safe, moderated community environment.',
      link: '/forum',
      color: '#7B1FA2',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped' },
    { number: '24/7', label: 'Support Available' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '50+', label: 'Qualified Counselors' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #1565C0 0%, #2E7D32 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                Your Mental Health Matters
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                A comprehensive digital support system designed specifically for students in higher education. 
                Get the help you need, when you need it, in a safe and confidential environment.
              </Typography>
              {!user ? (
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/register"
                    sx={{
                      mr: 2,
                      mb: 2,
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/login"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/chatbot"
                  sx={{
                    mt: 2,
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Start Your Journey
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <HealthAndSafety sx={{ fontSize: { xs: 100, md: 150 } }} />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box textAlign="center">
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Comprehensive Support Services
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Our platform provides multiple pathways to mental health support
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: feature.color, mr: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" fontWeight="medium">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={feature.link}
                    disabled={!user}
                    sx={{ color: feature.color }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Paper sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h3" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Join thousands of students who have found support through our platform
            </Typography>
            {!user ? (
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/chatbot"
                sx={{ mt: 2 }}
              >
                Start Chatting
              </Button>
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Home;