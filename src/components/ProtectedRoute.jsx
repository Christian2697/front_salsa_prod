import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        let { isAuth } = this.props;
        
        // Conversión explícita a boolean
        const isAuthenticated = Boolean(isAuth);
        
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;