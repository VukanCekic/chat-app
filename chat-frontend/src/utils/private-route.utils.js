import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export const PrivateRoutes = () => {
  const user = useSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
