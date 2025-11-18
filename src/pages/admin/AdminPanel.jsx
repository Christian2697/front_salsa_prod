/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { ConfigProvider, Spin, theme } from 'antd';
import { Navigate } from 'react-router-dom';
import { withAuth } from '../../context/withAuth';

const { defaultAlgorithm, darkAlgorithm } = theme;

class AdminPanel extends Component {
  state = {
    isDarkMode: true,
  }

  render() {
    const { isDarkMode } = this.state;
    const { auth } = this.props;

    // Si está verificando, mostrar spinner breve
    if (auth.isChecking) {
      return <Spin spinning tip="Verificando autenticación..." fullscreen />;
    }

    // Redirigir si no está autenticado después de verificar
    if (!auth.authChecked && !auth.isChecking) {
      return <Navigate to={'/login'} replace={true} />;
    }

    return (
      <ConfigProvider theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h4">Bienvenido a Admin</Typography>
          <p>Hola {auth.user?.username || 'Administrador'}</p>
          <p>Rol: {auth.user?.role || 'user'}</p>
          <p>Contador de verificaciones: {auth.contador}</p>
        </motion.div>
      </ConfigProvider>
    )
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(AdminPanel);