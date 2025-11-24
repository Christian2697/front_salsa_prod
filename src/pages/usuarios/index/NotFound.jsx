// pages/usuarios/NotFound.jsx
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Container, Box } from '@mui/material';
import { ConfigProvider, theme } from 'antd';
import { withRouter } from '../../../components/withRouter';

const { darkAlgorithm, defaultAlgorithm } = theme;

class NotFound extends Component {
  render() {
    // Forzar modo oscuro para Antd
    const isDarkMode = true;

    return (
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: 'center',
                mt: 8,
                p: 4,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'background.paper', // Usar tema de MUI
                color: 'text.primary' // Usar tema de MUI
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
                onClick={() => this.props.navigate('/')}
                sx={{ mr: 2, mb: 1 }}
              >
                Volver al Inicio
              </Button>
              <Button
                variant="contained"
                onClick={() => this.props.navigate('/admin')}
                sx={{ mr: 2, mb: 1 }}
              >
                Volver al Inicio de Admin
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.props.navigate('/admin/login')}
                sx={{ mb: 1 }}
              >
                Ir al Login
              </Button>
            </Box>
          </Container>
        </motion.div>
      </ConfigProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(NotFound);