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
import type { ChipTypeMap } from '@mui/material/Chip';
import type { DefaultComponentProps } from '@mui/material/OverridableComponent';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  CleaningServices as CleaningIcon,
  Construction as MaintenanceIcon,
  CheckCircle as AvailableIcon,
  DoNotDisturb as OccupiedIcon,
  Warning as MaintenanceNeededIcon,
} from '@mui/icons-material';

type ChipPropsType = DefaultComponentProps<ChipTypeMap<{}, "div">>;
type ChipColorType = NonNullable<ChipPropsType['color']>;

// Mock data - will be replaced with API data
const rooms = [
  {
    id: 1,
    number: '101',
    type: 'Standard',
    status: 'available',
    floor: '1st',
    price: 100,
    capacity: 2,
  },
  {
    id: 2,
    number: '102',
    type: 'Deluxe',
    status: 'occupied',
    floor: '1st',
    price: 150,
    capacity: 2,
  },
  {
    id: 3,
    number: '201',
    type: 'Suite',
    status: 'maintenance',
    floor: '2nd',
    price: 200,
    capacity: 4,
  },
];

const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case 'available':
      return <AvailableIcon />;
    case 'occupied':
      return <OccupiedIcon />;
    case 'maintenance':
      return <MaintenanceNeededIcon />;
    default:
      return <AvailableIcon />;  // Retourner une icône par défaut au lieu de null
  }
};

const getStatusColor = (status: string): ChipColorType => {
  switch (status) {
    case 'available':
      return 'success';
    case 'occupied':
      return 'error';
    case 'maintenance':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'available':
      return 'Disponible';
    case 'occupied':
      return 'Occupée';
    case 'maintenance':
      return 'En maintenance';
    default:
      return status;
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
                  <Typography variant="h6">
                    Chambre {room.number}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                      title="Nettoyage"
                    >
                      <CleaningIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                      title="Maintenance"
                    >
                      <MaintenanceIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  Type: {room.type}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  Étage: {room.floor}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  Capacité: {room.capacity} personnes
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  Prix: {room.price}€/nuit
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    icon={getStatusIcon(room.status)}
                    label={getStatusLabel(room.status)}
                    color={getStatusColor(room.status)}
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

export default Rooms;
