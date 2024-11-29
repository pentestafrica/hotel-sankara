import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Hotel as HotelIcon,
  Person as PersonIcon,
  EventAvailable as EventAvailableIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  // Mock data - will be replaced with real data from API
  const stats = {
    roomsOccupied: 75,
    staffPresent: 85,
    reservationsToday: 12,
    pendingTasks: 8,
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HotelIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Occupation des chambres</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{stats.roomsOccupied}%</Typography>
              <LinearProgress variant="determinate" value={stats.roomsOccupied} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Personnel présent</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{stats.staffPresent}%</Typography>
              <LinearProgress variant="determinate" value={stats.staffPresent} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventAvailableIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Réservations du jour</Typography>
              </Box>
              <Typography variant="h4">{stats.reservationsToday}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Tâches en attente</Typography>
              </Box>
              <Typography variant="h4">{stats.pendingTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Activités récentes
            </Typography>
            {/* Activity list will be added here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
