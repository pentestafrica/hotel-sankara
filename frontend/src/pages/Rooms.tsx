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
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  CleaningServices as CleaningServicesIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API data
const rooms = [
  { id: 101, type: 'Standard', status: 'available', floor: 1, price: 100 },
  { id: 102, type: 'Deluxe', status: 'occupied', floor: 1, price: 150 },
  { id: 103, type: 'Suite', status: 'cleaning', floor: 1, price: 200 },
  { id: 201, type: 'Standard', status: 'maintenance', floor: 2, price: 100 },
  // Add more rooms...
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'occupied':
      return 'error';
    case 'cleaning':
      return 'warning';
    case 'maintenance':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'available':
      return <CheckCircleIcon />;
    case 'occupied':
      return <BlockIcon />;
    case 'cleaning':
      return <CleaningServicesIcon />;
    case 'maintenance':
      return <WarningIcon />;
    default:
      return null;
  }
};

const Rooms = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gestion des chambres
        </Typography>
        <Button variant="contained" color="primary">
          Ajouter une chambre
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une chambre..."
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
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h5">
                    Chambre {room.id}
                  </Typography>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography color="textSecondary" gutterBottom>
                    Type: {room.type}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Étage: {room.floor}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Prix: {room.price}€/nuit
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    icon={getStatusIcon(room.status)}
                    label={room.status}
                    color={getStatusColor(room.status)}
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

export default Rooms;
