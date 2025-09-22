import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "@/pages/auth"; // make sure this file actually exists

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAdminLoggedIn()) {
    // Not logged in as admin, redirect to signin page
    return <Navigate to="/signin" replace />;
  }

  // Logged in, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
