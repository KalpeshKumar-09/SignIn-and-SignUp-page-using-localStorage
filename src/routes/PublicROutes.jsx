import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicROutes = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicROutes;
