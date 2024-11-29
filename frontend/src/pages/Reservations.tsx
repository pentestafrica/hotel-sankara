import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
const reservations = [
  {
    id: 1,
    guest: 'John Doe',
    roomNumber: '101',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    status: 'confirmed',
    guests: 2,
    amount: 500,
  },
  {
    id: 2,
    guest: 'Jane Smith',
    roomNumber: '102',
    checkIn: '2024-02-18',
    checkOut: '2024-02-22',
    status: 'pending',
    guests: 1,
    amount: 400,
  },
];

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmée';
    case 'pending':
      return 'En attente';
    case 'cancelled':
      return 'Annulée';
    default:
      return status;
  }
};

const getStatusColor = (status: string): ChipColorType => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
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
              <TableCell>Client</TableCell>
              <TableCell>Chambre</TableCell>
              <TableCell>Arrivée</TableCell>
              <TableCell>Départ</TableCell>
              <TableCell>Personnes</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.guest}</TableCell>
                <TableCell>{reservation.roomNumber}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>{reservation.amount}€</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(reservation.status)}
                    color={getStatusColor(reservation.status)}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
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
