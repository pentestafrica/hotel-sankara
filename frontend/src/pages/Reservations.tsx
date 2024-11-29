import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API data
const reservations = [
  {
    id: 1,
    guestName: 'Alice Johnson',
    roomNumber: '101',
    checkIn: '2024-02-10',
    checkOut: '2024-02-15',
    status: 'confirmed',
    phone: '+1234567890',
  },
  {
    id: 2,
    guestName: 'Bob Wilson',
    roomNumber: '202',
    checkIn: '2024-02-12',
    checkOut: '2024-02-14',
    status: 'checked_in',
    phone: '+1234567891',
  },
  // Add more reservations...
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checked_in':
      return 'success';
    case 'checked_out':
      return 'default';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmée';
    case 'checked_in':
      return 'Enregistré';
    case 'checked_out':
      return 'Terminée';
    case 'cancelled':
      return 'Annulée';
    default:
      return status;
  }
};

const Reservations = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gestion des réservations
        </Typography>
        <Button variant="contained" color="primary">
          Nouvelle réservation
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher une réservation..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Chambre</TableCell>
              <TableCell>Arrivée</TableCell>
              <TableCell>Départ</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{reservation.roomNumber}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(reservation.status)}
                    color={getStatusColor(reservation.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reservations;
