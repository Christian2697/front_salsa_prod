import React from 'react';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Usuarios from '../pages/admin/Usuarios';
import NavBarAdmin from '../components/NavBarAdmin';

class AppRoutes extends Component {

    render() {
        const { isAuth, userRole, updateAuthentication} = this.props
        return (
            <Routes>
                <Route path="/" element={<NavBarUser />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login isAuth={isAuth} role={userRole} updateAuthentication={updateAuthentication}/>} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="tumbao" element={<Tumbao />} />
                    <Route path="tumbao/reservation" element={<TumbaoReservation />} />
                </Route>
                <Route path="/admin/" role={userRole} element={<NavBarAdmin />}>
                    <Route element={<ProtectedRoute isAuth={isAuth} />}>
                        <Route element={<RoleRoute role={userRole} allowedRoles={['administrador']} />}>
                            <Route path="adminpanel" element={<AdminPanel />} />
                            <Route path="usuarios" element={<Usuarios />} />
                        </Route>
                         <Route element={<RoleRoute role={userRole} allowedRoles={['administrador']} />}>
                            <Route path="recepcion" element={<Recepcion />} />
                            <Route path="recepcion/escaneo" element={<Recepcion />} />
                        </Route>
                    </Route>
                </Route>

            </Routes>
        )
    }
}

export default AppRoutes