import { Navigate, Outlet } from 'react-router-dom';

const RoleRoute = ({ role, allowedRoles }) => {
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
};

export default RoleRoute;
