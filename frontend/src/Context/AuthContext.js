/**
 * This file provides the AuthContext, AuthProvider, and useAuth hook.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { set } from "mongoose";

const AuthContext = createContext();

/**
 * This function provides the AuthProvider
 * that wraps the application and provides the
 * AuthContext to all components in the app.
 *
 * @param {Object} children
 * @returns {Object}
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }

    // Set up Axios interceptor
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  /**
   * Fetches the user data from the backend.
   *
   * @param {*} token
   */
  const fetchUser = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setIsLoggedIn(true);
      setIsAdmin(response.data.role === "admin");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs the user in and fetches the user data.
   * @param {*} token
   */
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    fetchUser(token);
  };

  /*
   * Logs the user out and removes the user data.
   */
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        isAdmin,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
