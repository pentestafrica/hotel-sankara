import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API data
const tasks = [
  {
    id: 1,
    type: 'cleaning',
    description: 'Nettoyage complet de la chambre',
    roomNumber: '101',
    assignedTo: 'Jane Smith',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-02-10 14:00',
  },
  {
    id: 2,
    type: 'maintenance',
    description: 'Réparation climatisation',
    roomNumber: '203',
    assignedTo: 'John Doe',
    priority: 'urgent',
    status: 'in_progress',
    dueDate: '2024-02-10 16:00',
  },
  // Add more tasks...
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'in_progress':
      return 'info';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'success';
    case 'normal':
      return 'info';
    case 'high':
      return 'warning';
    case 'urgent':
      return 'error';
    default:
      return 'default';
  }
};

const Tasks = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gestion des tâches
        </Typography>
        <Button variant="contained" color="primary">
          Nouvelle tâche
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une tâche..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {task.type === 'cleaning' ? 'Nettoyage' : 'Maintenance'}
                  </Typography>
                  <Box>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <RoomIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    Chambre {task.roomNumber}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {task.dueDate}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 24, height: 24, mr: 1, fontSize: 12 }}
                  >
                    {task.assignedTo.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="body2">
                    {task.assignedTo}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    variant="filled"
                    size="small"
                  />
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    variant="filled"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tasks;
