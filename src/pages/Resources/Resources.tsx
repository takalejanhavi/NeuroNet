import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  Box,
  Tab,
  Tabs,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow,
  Headphones,
  MenuBook,
  Search,
  Language,
  Download,
  Favorite,
  Share,
} from '@mui/icons-material';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article';
  category: 'anxiety' | 'depression' | 'stress' | 'sleep' | 'mindfulness' | 'academic';
  language: 'english' | 'spanish' | 'french' | 'hindi';
  duration?: string;
  imageUrl: string;
  contentUrl: string;
  tags: string[];
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Managing Test Anxiety',
      description: 'Learn effective strategies to cope with exam stress and perform your best under pressure.',
      type: 'video',
      category: 'anxiety',
      language: 'english',
      duration: '15 mins',
      imageUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/video1',
      tags: ['exam', 'stress', 'techniques']
    },
    {
      id: '2',
      title: 'Guided Meditation for Sleep',
      description: 'A calming guided meditation to help you relax and improve your sleep quality.',
      type: 'audio',
      category: 'sleep',
      language: 'english',
      duration: '20 mins',
      imageUrl: 'https://images.pexels.com/photos/3822647/pexels-photo-3822647.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/audio1',
      tags: ['meditation', 'relaxation', 'bedtime']
    },
    {
      id: '3',
      title: 'Understanding Depression in Students',
      description: 'Comprehensive guide on recognizing depression symptoms and available support options.',
      type: 'article',
      category: 'depression',
      language: 'english',
      duration: '10 mins read',
      imageUrl: 'https://images.pexels.com/photos/6932342/pexels-photo-6932342.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/article1',
      tags: ['symptoms', 'support', 'awareness']
    },
    {
      id: '4',
      title: 'Técnicas de Respiración para la Ansiedad',
      description: 'Aprende técnicas de respiración efectivas para manejar momentos de ansiedad.',
      type: 'video',
      category: 'anxiety',
      language: 'spanish',
      duration: '12 mins',
      imageUrl: 'https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/video2',
      tags: ['respiración', 'calma', 'técnicas']
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      description: 'Audio guide for progressive muscle relaxation to reduce physical tension and stress.',
      type: 'audio',
      category: 'stress',
      language: 'english',
      duration: '25 mins',
      imageUrl: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/audio2',
      tags: ['relaxation', 'tension', 'muscle']
    },
    {
      id: '6',
      title: 'Mindful Study Techniques',
      description: 'Learn how to incorporate mindfulness into your study routine for better focus and retention.',
      type: 'article',
      category: 'academic',
      language: 'english',
      duration: '8 mins read',
      imageUrl: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=400',
      contentUrl: 'https://example.com/article2',
      tags: ['study', 'focus', 'mindfulness']
    }
  ];

  const categories = [
    { label: 'All Resources', value: 'all' },
    { label: 'Anxiety', value: 'anxiety' },
    { label: 'Depression', value: 'depression' },
    { label: 'Stress Management', value: 'stress' },
    { label: 'Sleep & Rest', value: 'sleep' },
    { label: 'Mindfulness', value: 'mindfulness' },
    { label: 'Academic Support', value: 'academic' },
  ];

  const languages = [
    { label: 'All Languages', value: 'all' },
    { label: 'English', value: 'english' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'French', value: 'french' },
    { label: 'Hindi', value: 'hindi' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedTab === 0 || resource.category === categories[selectedTab].value;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayArrow />;
      case 'audio':
        return <Headphones />;
      case 'article':
        return <MenuBook />;
      default:
        return <MenuBook />;
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'error';
      case 'audio':
        return 'warning';
      case 'article':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Psychoeducational Resource Hub
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Access curated mental health resources in multiple formats and languages
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              SelectProps={{ native: true }}
            >
              {languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Language sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {filteredResources.length} resources found
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, index) => (
            <Tab key={category.value} label={category.label} />
          ))}
        </Tabs>
      </Box>

      {/* Resource Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
                transition: 'all 0.3s ease-in-out'
              }}
              onClick={() => handleResourceClick(resource)}
            >
              <CardMedia
                component="img"
                height="160"
                image={resource.imageUrl}
                alt={resource.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    icon={getResourceIcon(resource.type)}
                    label={resource.type}
                    color={getResourceTypeColor(resource.type) as any}
                    size="small"
                  />
                  <Chip
                    label={resource.duration}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <IconButton size="small">
                  <Favorite />
                </IconButton>
                <IconButton size="small">
                  <Share />
                </IconButton>
                <IconButton size="small">
                  <Download />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Button size="small">
                  {resource.type === 'video' ? 'Watch' : resource.type === 'audio' ? 'Listen' : 'Read'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredResources.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No resources found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setSelectedTab(0);
              setSelectedLanguage('all');
            }}
            sx={{ mt: 2 }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Resource Detail Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedResource && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getResourceIcon(selectedResource.type)}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {selectedResource.title}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <img
                src={selectedResource.imageUrl}
                alt={selectedResource.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
              />
              <Typography variant="body1" paragraph>
                {selectedResource.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedResource.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Duration: {selectedResource.duration} | Language: {selectedResource.language}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button variant="contained" startIcon={getResourceIcon(selectedResource.type)}>
                {selectedResource.type === 'video' ? 'Watch Now' : 
                 selectedResource.type === 'audio' ? 'Listen Now' : 'Read Now'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Resources;