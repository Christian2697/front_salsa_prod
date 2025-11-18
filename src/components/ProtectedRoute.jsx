// components/ProtectedRoute.jsx
import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { withAuth } from '../context/withAuth';
import { Spin } from 'antd';

class ProtectedRoute extends Component {
  state = {
    hasCheckedAuth: false
  }

  componentDidMount() {
    this.initializeAuth();
  }

  initializeAuth = async () => {
    const { auth } = this.props;
    
    // Solo verificar autenticación si no se ha verificado antes
    if (!auth.authChecked && !auth.isChecking && !this.state.hasCheckedAuth) {
      this.setState({ hasCheckedAuth: true });
      await auth.checkAuthentication();
    }
  }

  render() {
    const { auth } = this.props;
    const { hasCheckedAuth } = this.state;

    // Si está verificando, mostrar spinner
    if (auth.isChecking) {
      return <Spin spinning tip="Verificando autenticación..." fullscreen />;
    }

    // Si ya verificó y no está autenticado, redirigir al login
    if (!auth.authChecked && !auth.isChecking && hasCheckedAuth) {
      return <Navigate to="/admin/login" replace />;
    }

    // Si está autenticado, renderizar el outlet
    return auth.authChecked ? <Outlet /> : null;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(ProtectedRoute);