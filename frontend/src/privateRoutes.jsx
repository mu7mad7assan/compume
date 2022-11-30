import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './customeHooks/useAuth.hooks';

function PrivateRoutes() {
  const { Auth } = useAuth();
  if (Auth === undefined) return 'loading...';
  return Auth === true ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
