import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import type { ChipTypeMap } from '@mui/material/Chip';
import type { DefaultComponentProps } from '@mui/material/OverridableComponent';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

type ChipPropsType = DefaultComponentProps<ChipTypeMap<{}, "div">>;
type ChipColorType = NonNullable<ChipPropsType['color']>;

// Mock data - will be replaced with API data
const tasks = [
  {
    id: 1,
    title: 'Nettoyer la chambre 101',
    description: 'Nettoyage complet de la chambre incluant la salle de bain',
    assignedTo: 'Marie Dupont',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-20',
  },
  {
    id: 2,
    title: 'Réparer climatisation chambre 203',
    description: 'La climatisation fait un bruit anormal',
    assignedTo: 'Jean Martin',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2024-01-19',
  },
];

const getStatusColor = (status: string): ChipColorType => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'warning';
    case 'pending':
      return 'info';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string): ChipColorType => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'Terminé';
    case 'in_progress':
      return 'En cours';
    case 'pending':
      return 'En attente';
    default:
      return status;
  }
};

const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'Urgent';
    case 'medium':
      return 'Normal';
    case 'low':
      return 'Faible';
    default:
      return priority;
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
                    {task.title}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography color="textSecondary" variant="body2" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Assigné à: {task.assignedTo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date limite: {task.dueDate}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={getStatusLabel(task.status)}
                    color={getStatusColor(task.status)}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip
                    label={getPriorityLabel(task.priority)}
                    color={getPriorityColor(task.priority)}
                    size="small"
                    sx={{ borderRadius: 1 }}
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
