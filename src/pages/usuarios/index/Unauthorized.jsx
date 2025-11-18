// pages/usuarios/Unauthorized.jsx
import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 8,
          p: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h4" gutterBottom color="error">
          403 - Acceso Denegado
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          No tienes los permisos necesarios para acceder a esta página.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin')}
          sx={{ mr: 2 }}
        >
          Volver al Inicio
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/admin/login')}
        >
          Ir al Login
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;