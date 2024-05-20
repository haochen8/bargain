/**
 * This file provides the AuthContext and AuthProvider components.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

/**
 * Provides authentication context to its children.
 *
 * @param {*} param0 The children components.
 * @returns {JSX.Element} The rendered application.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  /**
   * Fetches the user information from the backend.
   */
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/me`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (isLoggedIn) {
        logout();
      }
    }
  };

  /**
   * Logs in the user with the provided token.
   *
   * @param {*} token
   */
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    fetchUser(token);
  };

  /**
   * Logs out the user.
   */
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
