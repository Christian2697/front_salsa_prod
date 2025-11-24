// pages/usuarios/NotFound.jsx
import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
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
          404 - Recurso no encontrado
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          No se encontró la página a la cual quiere acceder.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Volver al Inicio
        </Button>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin')}
          sx={{ mr: 2 }}
        >
          Volver al Inicio de Admin
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

export default NotFound;