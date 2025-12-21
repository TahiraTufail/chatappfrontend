import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem("Token"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
