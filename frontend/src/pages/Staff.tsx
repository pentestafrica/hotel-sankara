import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API data
const staff = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    role: 'Réceptionniste',
    status: 'active',
    email: 'john.doe@hotel.com',
    phone: '+1234567890',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'Femme de chambre',
    status: 'on_leave',
    email: 'jane.smith@hotel.com',
    phone: '+1234567891',
  },
  // Add more staff members...
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'on_leave':
      return 'warning';
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

const Staff = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gestion du personnel
        </Typography>
        <Button variant="contained" color="primary">
          Ajouter un employé
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un employé..."
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
        {staff.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mr: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {employee.firstName[0]}{employee.lastName[0]}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {employee.role}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">{employee.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">{employee.phone}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Chip
                    label={employee.status === 'active' ? 'Actif' : employee.status === 'on_leave' ? 'En congé' : 'Inactif'}
                    color={getStatusColor(employee.status)}
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

export default Staff;
