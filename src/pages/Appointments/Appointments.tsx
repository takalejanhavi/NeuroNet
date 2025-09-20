import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Person,
  Schedule,
  VideoCall,
  LocationOn,
  Star,
  Check,
  Cancel,
} from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  avatar: string;
  availability: string[];
  sessionTypes: ('in-person' | 'video' | 'phone')[];
}

interface Appointment {
  id: string;
  counselorId: string;
  date: Dayjs;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const Appointments: React.FC = () => {
  const [counselors] = useState<Counselor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      sessionTypes: ['in-person', 'video', 'phone'],
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'Counseling Psychologist',
      specialties: ['Relationship Issues', 'Social Anxiety', 'Self-Esteem'],
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=100',
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      sessionTypes: ['video', 'phone'],
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Clinical Social Worker',
      specialties: ['Trauma', 'PTSD', 'Crisis Intervention'],
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=100',
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      sessionTypes: ['in-person', 'video'],
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      counselorId: '1',
      date: dayjs().add(3, 'day'),
      time: '2:00 PM',
      type: 'video',
      status: 'scheduled',
      notes: 'Initial consultation for anxiety management',
    },
  ]);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('video');
  const [appointmentNotes, setAppointmentNotes] = useState('');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  ];

  const handleBookAppointment = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counselorId: selectedCounselor.id,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'scheduled',
      notes: appointmentNotes,
    };

    setAppointments([...appointments, newAppointment]);
    setBookingOpen(false);
    setSelectedCounselor(null);
    setSelectedDate(dayjs().add(1, 'day'));
    setSelectedTime('');
    setAppointmentNotes('');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
    ));
  };

  const getCounselorById = (id: string) => {
    return counselors.find(c => c.id === id);
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCall />;
      case 'phone':
        return <Schedule />;
      case 'in-person':
        return <LocationOn />;
      default:
        return <Schedule />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Appointment Booking
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Schedule confidential sessions with qualified mental health professionals
        </Typography>

        <Grid container spacing={4}>
          {/* Counselors Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Available Counselors
            </Typography>
            
            {counselors.map((counselor) => (
              <Card key={counselor.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={counselor.avatar} 
                      sx={{ width: 80, height: 80, mr: 3 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{counselor.name}</Typography>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {counselor.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Star sx={{ color: 'gold', mr: 0.5, fontSize: 18 }} />
                        <Typography variant="body2">{counselor.rating}/5.0</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {counselor.specialties.map((specialty) => (
                          <Chip key={specialty} label={specialty} size="small" />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {counselor.sessionTypes.map((type) => (
                          <Chip
                            key={type}
                            icon={getSessionTypeIcon(type)}
                            label={type}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedCounselor(counselor);
                        setBookingOpen(true);
                      }}
                    >
                      Book Session
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Upcoming Appointments */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Your Appointments
            </Typography>
            
            {appointments.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" align="center">
                    No appointments scheduled yet
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <List>
                {appointments.map((appointment) => {
                  const counselor = getCounselorById(appointment.counselorId);
                  return (
                    <React.Fragment key={appointment.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={counselor?.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={counselor?.name}
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                {appointment.date.format('MMM DD, YYYY')} at {appointment.time}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Chip
                                  icon={getSessionTypeIcon(appointment.type)}
                                  label={appointment.type}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <Chip
                                  label={appointment.status}
                                  color={getStatusColor(appointment.status) as any}
                                  size="small"
                                />
                              </Box>
                              {appointment.status === 'scheduled' && (
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  sx={{ mt: 1 }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            )}
          </Grid>
        </Grid>

        {/* Crisis Support Alert */}
        <Alert severity="error" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Crisis Support:</strong> If you're experiencing a mental health emergency, 
            please call 911 or the National Suicide Prevention Lifeline at 988. 
            For immediate support, visit your nearest emergency room.
          </Typography>
        </Alert>

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Book Appointment with {selectedCounselor?.name}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={dayjs().add(1, 'day')}
                  maxDate={dayjs().add(30, 'day')}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select Time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="">Choose a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Session Type
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {selectedCounselor?.sessionTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'contained' : 'outlined'}
                      startIcon={getSessionTypeIcon(type)}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes (Optional)"
                  placeholder="Briefly describe what you'd like to discuss..."
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
              startIcon={<Check />}
            >
              Book Appointment
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default Appointments;