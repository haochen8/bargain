/**
 * This file provides a higher-order component to protect routes
 * that require authentication and admin access.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext";

/**
 * Higher-order component to protect routes that require authentication and admin access.
 *
 * @param {JSX.Element} component - The component to render if authenticated and authorized.
 * @param {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @param {boolean} isAdmin - Indicates if the user is an admin.
 * @param {JSX.Element} fallback - The component to render if not authenticated or not authorized.
 * @returns {JSX.Element} The rendered component or a redirect.
 */
const PrivateRoute = ({ component: Component, fallback, ...rest }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return isAuthenticated && isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to={fallback} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  fallback: PropTypes.string.isRequired,
};

export default PrivateRoute;
