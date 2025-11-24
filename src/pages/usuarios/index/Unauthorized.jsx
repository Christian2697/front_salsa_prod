/* eslint-disable no-unused-vars */
// pages/usuarios/Unauthorized.jsx
import React, { Component } from 'react';
import config from '../../../ENV/env';
import { motion } from 'framer-motion';
import NotificationWrapper, { openNotification } from '../../../components/NotificationWrapper';
import { Typography, Container, Box } from '@mui/material';
import { Button, Space, Spin } from 'antd';
import { withRouter } from '../../../components/withRouter';
import { withAuth } from '../../../context/withAuth.jsx';
import CustomModal from '../../../components/Modales';

class Unauthorized extends Component {

  state = {
    isLoader: false,
    messageLoader: '',
    showModal: false,
    typeModal: '',
    modalConfig: {
      titleModal: '',
      bodyModal: '',
      okText: '',
      cancelText: '',
      onOk: () => { },
      onCancel: () => { },
    },
    url: config.urlBack,
    hasCheckedAuth: false
  };

  checkAuth = async () => {
    const { auth } = this.props;
    
    // Solo verificar autenticación si no se ha verificado antes y no está en proceso
    if (!auth.authChecked && !auth.isChecking && !this.state.hasCheckedAuth) {
      this.setState({ hasCheckedAuth: true });
      await auth.checkAuthentication();
    }
  }

  OnOffLoader = (loader, message) => {
    this.setState({
      isLoader: loader,
      messageLoader: message
    });
  };

  openNotificationWithIcon = (type, titleNoti, messageNoti) => {
    openNotification(type, titleNoti, messageNoti);
  };

  logout = async () => {
    const { navigate } = this.props;
    const { auth } = this.props;
    this.OnOffLoader(true, 'Cerrando Sesión...');

    try {
      const response = await fetch(`${this.state.url}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      this.OnOffLoader(false);
      const resp = await response.json();
      if (response.ok) {
        auth.updateAuthentication(false);
        console.log( response.status, resp.mensaje);
        this.openNotificationWithIcon('success', 'Éxito', resp.mensaje);
        navigate('/admin/login');
      } else {
        console.log( response.status, resp);
        this.openNotificationWithIcon('error', 'Error', resp.error);
      }
    } catch (e) {
      this.OnOffLoader(true);
      this.openNotificationWithIcon('error', 'Error en el servidor', e.message);
      console.log(e);
    }
  };

  render() {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <NotificationWrapper />
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
            <Space>
              <Button
                variant="solid"
                color='primary'
                onClick={() => this.props.navigate('/admin')}
              >
                Volver al Inicio
              </Button>
              <Button
                variant="solid"
                color='danger'
                onClick={() => this.logout()}
              >
                Cerrar sesión
              </Button>
            </Space>
          </Box>
        </Container>
        <CustomModal
          visible={this.state.showModal}
          type={this.state.typeModal}
          modalConfig={this.state.modalConfig}
        />

        <Spin spinning={this.state.isLoader} tip={this.state.messageLoader} fullscreen />
      </motion.div>
    )
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(withAuth(Unauthorized));