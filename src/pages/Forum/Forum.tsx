import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add,
  ThumbUp,
  ThumbDown,
  Comment,
  Flag,
  Send,
  Close,
} from '@mui/icons-material';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'student' | 'counselor' | 'moderator';
  timestamp: Date;
  likes: number;
  dislikes: number;
  commentCount: number;
  category: string;
  isAnonymous: boolean;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Coping with exam anxiety',
      content: 'Hi everyone, I\'ve been struggling with severe anxiety during exams. My heart races and I can\'t think clearly. Has anyone found techniques that really work?',
      author: 'Anonymous Student',
      authorRole: 'student',
      timestamp: new Date(2024, 0, 15),
      likes: 12,
      dislikes: 0,
      commentCount: 8,
      category: 'Anxiety',
      isAnonymous: true,
    },
    {
      id: '2',
      title: 'Study-life balance tips',
      content: 'As a counselor, I wanted to share some evidence-based strategies for maintaining healthy boundaries between study and personal life...',
      author: 'Dr. Sarah Johnson',
      authorRole: 'counselor',
      timestamp: new Date(2024, 0, 14),
      likes: 25,
      dislikes: 1,
      commentCount: 15,
      category: 'Academic',
      isAnonymous: false,
    },
    {
      id: '3',
      title: 'Feeling isolated and lonely',
      content: 'It\'s my first year at university and I\'m having trouble making friends. The social aspect is really affecting my mental health. Any advice?',
      author: 'Anonymous Student',
      authorRole: 'student',
      timestamp: new Date(2024, 0, 13),
      likes: 18,
      dislikes: 0,
      commentCount: 22,
      category: 'Social',
      isAnonymous: true,
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      postId: '1',
      content: 'I\'ve found that deep breathing exercises really help me. Try the 4-7-8 technique before exams.',
      author: 'Sarah M.',
      timestamp: new Date(2024, 0, 15, 10, 30),
      likes: 5,
    },
    {
      id: '2',
      postId: '1',
      content: 'Progressive muscle relaxation worked wonders for me. There are great apps that guide you through it.',
      author: 'Anonymous',
      timestamp: new Date(2024, 0, 15, 11, 15),
      likes: 3,
    }
  ]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [postViewOpen, setPostViewOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General',
    isAnonymous: true,
  });

  const categories = ['General', 'Anxiety', 'Depression', 'Academic', 'Social', 'Sleep', 'Stress'];

  const handleCreatePost = () => {
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: newPost.isAnonymous ? 'Anonymous Student' : 'Current User',
      authorRole: 'student',
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      commentCount: 0,
      category: newPost.category,
      isAnonymous: newPost.isAnonymous,
    };

    setPosts([post, ...posts]);
    setNewPostOpen(false);
    setNewPost({ title: '', content: '', category: 'General', isAnonymous: true });
  };

  const handleAddComment = () => {
    if (!selectedPost || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: selectedPost.id,
      content: newComment,
      author: 'Current User',
      timestamp: new Date(),
      likes: 0,
    };

    setComments([...comments, comment]);
    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, commentCount: post.commentCount + 1 }
        : post
    ));
    setNewComment('');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'counselor':
        return 'primary';
      case 'moderator':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'counselor':
        return '👩‍⚕️ Counselor';
      case 'moderator':
        return '🛡️ Moderator';
      default:
        return '👤 Student';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Peer Support Forum
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        A safe space for students to connect, share experiences, and support each other
      </Typography>

      {/* Forum Guidelines */}
      <Card sx={{ mb: 4, bgcolor: 'primary.light', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Forum Guidelines
          </Typography>
          <Typography variant="body2">
            • Be respectful and supportive • No personal attacks or discrimination • 
            Maintain confidentiality • Report concerning content to moderators • 
            Seek professional help for crisis situations
          </Typography>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card sx={{ '&:hover': { boxShadow: 4 }, transition: 'all 0.3s ease-in-out' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: getRoleColor(post.authorRole) + '.main' }}>
                      {post.author.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {post.author}
                      </Typography>
                      <Chip 
                        label={getRoleBadge(post.authorRole)} 
                        size="small"
                        color={getRoleColor(post.authorRole) as any}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip label={post.category} size="small" />
                    <Typography variant="caption" display="block" color="text.secondary">
                      {post.timestamp.toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.content}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Box>
                  <IconButton size="small" onClick={() => handleLikePost(post.id)}>
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    {post.likes}
                  </Typography>
                  
                  <IconButton size="small">
                    <Comment fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    {post.commentCount}
                  </Typography>
                </Box>
                
                <Box>
                  <Button 
                    size="small" 
                    onClick={() => {
                      setSelectedPost(post);
                      setPostViewOpen(true);
                    }}
                  >
                    View Discussion
                  </Button>
                  <IconButton size="small">
                    <Flag fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Post FAB */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setNewPostOpen(true)}
      >
        <Add />
      </Fab>

      {/* New Post Dialog */}
      <Dialog open={newPostOpen} onClose={() => setNewPostOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            margin="normal"
            SelectProps={{ native: true }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="What's on your mind?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant={newPost.isAnonymous ? 'contained' : 'outlined'}
              onClick={() => setNewPost({ ...newPost, isAnonymous: true })}
              sx={{ mr: 1 }}
            >
              Post Anonymously
            </Button>
            <Button
              variant={!newPost.isAnonymous ? 'contained' : 'outlined'}
              onClick={() => setNewPost({ ...newPost, isAnonymous: false })}
            >
              Post with Name
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewPostOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreatePost} 
            variant="contained"
            disabled={!newPost.title.trim() || !newPost.content.trim()}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post View Dialog */}
      <Dialog open={postViewOpen} onClose={() => setPostViewOpen(false)} maxWidth="md" fullWidth>
        {selectedPost && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{selectedPost.title}</Typography>
              <IconButton onClick={() => setPostViewOpen(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ mr: 2, bgcolor: getRoleColor(selectedPost.authorRole) + '.main' }}>
                  {selectedPost.author.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {selectedPost.author}
                  </Typography>
                  <Chip 
                    label={getRoleBadge(selectedPost.authorRole)} 
                    size="small"
                    color={getRoleColor(selectedPost.authorRole) as any}
                  />
                </Box>
              </Box>
              
              <Typography variant="body1" paragraph>
                {selectedPost.content}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Comments ({comments.filter(c => c.postId === selectedPost.id).length})
              </Typography>
              
              {comments
                .filter(comment => comment.postId === selectedPost.id)
                .map((comment) => (
                  <Box key={comment.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2">{comment.author}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.timestamp.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{comment.content}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <IconButton size="small">
                        <ThumbUp fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">{comment.likes}</Typography>
                    </Box>
                  </Box>
                ))}
              
              <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add a supportive comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send />
                </IconButton>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Forum;