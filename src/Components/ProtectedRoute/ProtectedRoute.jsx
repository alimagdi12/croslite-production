import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "../../Context/Login/LoginContext"; // Import the login context

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin(); // Use the login context

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
