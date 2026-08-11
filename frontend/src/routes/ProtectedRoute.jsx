import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../enum/rotas';

const ProtectedRoute = () => {

  const token = localStorage.getItem('@App:token');

  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;