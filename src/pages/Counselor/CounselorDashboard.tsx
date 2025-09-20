import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  Schedule,
  Person,
  Warning,
  CheckCircle,
  VideoCall,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Appointment {
  id: string;
  studentName: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  priority: 'normal' | 'high' | 'urgent';
  notes?: string;
}

interface CrisisAlert {
  id: string;
  studentName: string;
  phqScore: number;
  timestamp: string;
  status: 'pending' | 'addressed';
  description: string;
}

const CounselorDashboard: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');

  const appointments: Appointment[] = [
    {
      id: '1',
      studentName: 'Anonymous Student A',
      date: '2024-01-22',
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      priority: 'high',
      notes: 'Initial consultation for anxiety management',
    },
    {
      id: '2',
      studentName: 'Anonymous Student B',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'in-person',
      status: 'scheduled',
      priority: 'normal',
      notes: 'Follow-up session for depression treatment',
    },
    {
      id: '3',
      studentName: 'Anonymous Student C',
      date: '2024-01-22',
      time: '4:00 PM',
      type: 'phone',
      status: 'completed',
      priority: 'normal',
      notes: 'Crisis intervention completed successfully',
    },
  ];

  const crisisAlerts: CrisisAlert[] = [
    {
      id: '1',
      studentName: 'Anonymous Student X',
      phqScore: 18,
      timestamp: '2024-01-21 09:30 AM',
      status: 'pending',
      description: 'PHQ-9 score indicates moderately severe depression with concerning responses',
    },
    {
      id: '2',
      studentName: 'Anonymous Student Y',
      phqScore: 21,
      timestamp: '2024-01-21 02:15 PM',
      status: 'addressed',
      description: 'Severe depression score - emergency appointment scheduled',
    },
  ];

  const weeklyStats = [
    { day: 'Mon', sessions: 8, crisisAlerts: 2 },
    { day: 'Tue', sessions: 6, crisisAlerts: 1 },
    { day: 'Wed', sessions: 9, crisisAlerts: 0 },
    { day: 'Thu', sessions: 7, crisisAlerts: 3 },
    { day: 'Fri', sessions: 5, crisisAlerts: 1 },
    { day: 'Sat', sessions: 3, crisisAlerts: 0 },
    { day: 'Sun', sessions: 2, crisisAlerts: 0 },
  ];

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCall />;
      case 'phone':
        return <Phone />;
      case 'in-person':
        return <LocationOn />;
      default:
        return <Schedule />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  const handleAddressAlert = (alertId: string) => {
    // In real implementation, this would update the backend
    console.log('Addressing crisis alert:', alertId);
  };

  const handleCompleteAppointment = () => {
    if (selectedAppointment) {
      // Save session notes and mark as completed
      console.log('Completing appointment:', selectedAppointment.id, 'Notes:', sessionNotes);
      setAppointmentDialogOpen(false);
      setSessionNotes('');
      setSelectedAppointment(null);
    }
  };

  const todaysAppointments = appointments.filter(apt => apt.date === '2024-01-22');
  const pendingAlerts = crisisAlerts.filter(alert => alert.status === 'pending');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Counselor Dashboard
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Manage your appointments and monitor student mental health alerts
      </Typography>

      {/* Crisis Alerts */}
      {pendingAlerts.length > 0 && (
        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            ⚠️ Crisis Alerts Requiring Immediate Attention ({pendingAlerts.length})
          </Typography>
          {pendingAlerts.map((alert) => (
            <Box key={alert.id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <Typography variant="body1">
                <strong>{alert.studentName}</strong> - PHQ-9 Score: {alert.phqScore}/27
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {alert.description}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                {alert.timestamp}
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleAddressAlert(alert.id)}
              >
                Address Alert
              </Button>
            </Box>
          ))}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ color: 'primary.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{todaysAppointments.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Today's Sessions
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
                <Person sx={{ color: 'success.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{appointments.filter(a => a.status === 'completed').length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed Sessions
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
                <Warning sx={{ color: 'error.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{pendingAlerts.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Alerts
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
                <CheckCircle sx={{ color: 'info.main', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{crisisAlerts.filter(a => a.status === 'addressed').length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts Addressed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Appointments
              </Typography>
              <List>
                {todaysAppointments.map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: appointment.priority === 'high' ? 'warning.light' : 'background.paper',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {getSessionTypeIcon(appointment.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1">
                            {appointment.studentName}
                          </Typography>
                          <Chip 
                            label={appointment.priority}
                            color={getPriorityColor(appointment.priority) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {appointment.time} - {appointment.type}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {appointment.notes}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status) as any}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      {appointment.status === 'scheduled' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setAppointmentDialogOpen(true);
                          }}
                        >
                          Start Session
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Activity Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#1565C0" strokeWidth={2} />
                  <Line type="monotone" dataKey="crisisAlerts" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Crisis Alerts History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Crisis Alerts Management
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>PHQ-9 Score</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {crisisAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>{alert.studentName}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${alert.phqScore}/27`}
                            color={alert.phqScore >= 20 ? 'error' : alert.phqScore >= 15 ? 'warning' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{alert.timestamp}</TableCell>
                        <TableCell>{alert.description}</TableCell>
                        <TableCell>
                          <Chip
                            label={alert.status}
                            color={alert.status === 'addressed' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {alert.status === 'pending' && (
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={() => handleAddressAlert(alert.id)}
                            >
                              Address
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Session Dialog */}
      <Dialog open={appointmentDialogOpen} onClose={() => setAppointmentDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Session with {selectedAppointment?.studentName}
        </DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Box>
              <Typography variant="body1" paragraph>
                <strong>Date:</strong> {selectedAppointment.date}<br />
                <strong>Time:</strong> {selectedAppointment.time}<br />
                <strong>Type:</strong> {selectedAppointment.type}<br />
                <strong>Priority:</strong> {selectedAppointment.priority}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Initial Notes:</strong> {selectedAppointment.notes}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Session Notes"
                placeholder="Document the session, progress made, treatment plan updates..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAppointmentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCompleteAppointment} variant="contained">
            Complete Session
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CounselorDashboard;