import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../enum/rotas';

const ProtectedRoute = () => {
  // Busca o token no localStorage
  const token = localStorage.getItem('@App:token');

  // Se o token existir, renderiza as rotas filhas (Outlet)
  // Se NÃO existir, redireciona para a página de login
  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;