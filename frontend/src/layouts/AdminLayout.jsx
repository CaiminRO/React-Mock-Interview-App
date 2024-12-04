import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  if (!isAuthenticated)
    return <Navigate to="/login" />;

  if (!isAdmin)
    return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminLayout;
