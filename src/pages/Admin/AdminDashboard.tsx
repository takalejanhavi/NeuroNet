import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tab,
  Tabs,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Assignment,
  Forum,
  Download,
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  // Mock data
  const stats = {
    totalUsers: 1847,
    activeUsers: 1523,
    totalSessions: 3241,
    forumPosts: 892,
  };

  const phqData = [
    { severity: 'Minimal', count: 450, color: '#4CAF50' },
    { severity: 'Mild', count: 380, color: '#FFC107' },
    { severity: 'Moderate', count: 290, color: '#FF9800' },
    { severity: 'Mod. Severe', count: 180, color: '#FF5722' },
    { severity: 'Severe', count: 85, color: '#F44336' },
  ];

  const monthlyUsage = [
    { month: 'Jan', sessions: 245, users: 120 },
    { month: 'Feb', sessions: 289, users: 145 },
    { month: 'Mar', sessions: 324, users: 168 },
    { month: 'Apr', sessions: 356, users: 189 },
    { month: 'May', sessions: 401, users: 210 },
    { month: 'Jun', sessions: 445, users: 234 },
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah@university.edu',
      role: 'counselor',
      status: 'active',
      joinDate: '2023-09-01',
      lastLogin: '2024-01-20',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@university.edu',
      role: 'admin',
      status: 'active',
      joinDate: '2023-08-01',
      lastLogin: '2024-01-20',
    },
  ];

  const handleExportData = () => {
    // Mock CSV export
    const csvData = 'Month,Sessions,Users\n' + 
      monthlyUsage.map(row => `${row.month},${row.sessions},${row.users}`).join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mental_health_analytics.csv';
    a.click();
  };

  const getStatusChip = (status: string) => (
    <Chip 
      label={status} 
      color={status === 'active' ? 'success' : 'default'}
      size="small"
    />
  );

  const getRoleChip = (role: string) => {
    const colors: { [key: string]: any } = {
      admin: 'error',
      counselor: 'primary',
      student: 'secondary'
    };
    return <Chip label={role} color={colors[role]} size="small" />;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleExportData}
        >
          Export Report
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ color: 'primary.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ color: 'success.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.activeUsers}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Assignment sx={{ color: 'info.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.totalSessions}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Sessions
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Forum sx={{ color: 'warning.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.forumPosts}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Forum Posts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Analytics" />
          <Tab label="User Management" />
          <Tab label="System Settings" />
        </Tabs>
      </Box>

      {/* Analytics Tab */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Usage Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sessions" stroke="#1565C0" strokeWidth={2} />
                    <Line type="monotone" dataKey="users" stroke="#2E7D32" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  PHQ-9 Severity Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={phqData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ severity, count }) => `${severity}: ${count}`}
                    >
                      {phqData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Session Types Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { type: 'Video', count: 1450 },
                      { type: 'In-Person', count: 890 },
                      { type: 'Phone', count: 670 },
                      { type: 'Chat', count: 231 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1565C0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* User Management Tab */}
      {selectedTab === 1 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">User Management</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setUserDialogOpen(true)}
              >
                Add User
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Join Date</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleChip(user.role)}</TableCell>
                      <TableCell>{getStatusChip(user.status)}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* System Settings Tab */}
      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Configuration
                </Typography>
                <TextField
                  fullWidth
                  label="Max Sessions Per Day"
                  defaultValue="50"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Session Duration (minutes)"
                  defaultValue="50"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Crisis Alert Threshold (PHQ-9)"
                  defaultValue="15"
                  margin="normal"
                />
                <Button variant="contained" sx={{ mt: 2 }}>
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <TextField
                  fullWidth
                  label="Admin Email"
                  defaultValue="admin@university.edu"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Crisis Hotline Number"
                  defaultValue="988"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Crisis Message Template"
                  defaultValue="If you're experiencing a mental health crisis..."
                  margin="normal"
                />
                <Button variant="contained" sx={{ mt: 2 }}>
                  Update Notifications
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Add User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Role"
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="student">Student</option>
            <option value="counselor">Counselor</option>
            <option value="admin">Admin</option>
          </TextField>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;