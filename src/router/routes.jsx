// router/routes.jsx
import React from 'react';
import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBarUser from '../components/NavBarUser';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleRoute from '../components/RoleRoute';
import Home from '../pages/usuarios/index/Home';
import AdminPanel from '../pages/admin/AdminPanel';
import Login from '../pages/usuarios/login/Login';
import Nosotros from '../pages/usuarios/index/Nosotros';
import Tumbao from "../pages/usuarios/tumbao/tumbao";
import TumbaoReservation from '../pages/usuarios/tumbao/TumbaoReservation';
import Recepcion from '../pages/recepcion/recepcion';
import NavBarAdmin from '../components/NavBarAdmin';
import Unauthorized from '../pages/usuarios/index/Unauthorized';
import ReservGroup from '../pages/admin/reservaciones/grupal/ReservGroup';
import NotFound from '../pages/usuarios/index/NotFound';
import Usuarios from '../pages/admin/usuarios/Usuarios';
import ReservPerson from '../pages/admin/reservaciones/personal/ReservPerson';

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<NavBarUser />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="tumbao" element={<Tumbao />} />
          <Route path="tumbao/reservation" element={<TumbaoReservation />} />
          <Route path="notfound" element={<NotFound />} />
        </Route>

        {/* Rutas protegidas del admin */}
        <Route path="/admin" element={<NavBarAdmin />}>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="adminpanel" element={<AdminPanel />} />
          {/* Protección de autenticación - se aplica a todas las rutas dentro */}
          <Route element={<ProtectedRoute />}>
            {/* Protección por rol para administrador */}
            <Route element={<RoleRoute allowedRoles={['administrador']} />}>
              <Route path="reserv/group" element={<ReservGroup />} />
              <Route path="reserv/person" element={<ReservPerson />} />
              <Route path="usuarios" element={<Usuarios />} />
            </Route>
            
            {/* Protección por rol para recepción */}
            <Route element={<RoleRoute allowedRoles={['administrador', 'recepcion']} />}>
              <Route path="recepcion" element={<Recepcion />} />
              <Route path="recepcion/escaneo" element={<Recepcion />} />
            </Route>

            {/* Ruta por defecto para /admin */}
            <Route index element={<Navigate to="adminpanel" replace />} />
          </Route>
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    )
  }
}

export default AppRoutes;