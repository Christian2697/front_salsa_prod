// components/RoleRoute.jsx
import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { withAuth } from '../context/withAuth';
import { Spin } from 'antd';

class RoleRoute extends Component {
  render() {
    const { auth, allowedRoles } = this.props;

    // Si está verificando, mostrar spinner
    if (auth.isChecking) {
      return <Spin spinning tip="Verificando permisos..." fullscreen />;
    }

    // Si no está autenticado, redirigir al login
    if (!auth.authChecked) {
      return <Navigate to="/admin/login" replace />;
    }

    // Verificar si el rol del usuario está en los roles permitidos
    const hasRequiredRole = allowedRoles.includes(auth.user?.role);
    
    return hasRequiredRole ? <Outlet /> : <Navigate to="/admin/unauthorized" replace />;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(RoleRoute);