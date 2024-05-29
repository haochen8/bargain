import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Retrieved token from localStorage on mount:", token);
    if (token) {
      fetchUser(token);
    } else {
      console.log("No token found in localStorage on mount");
    }

    // Set up Axios interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Added Authorization header with token:", token);
        } else {
          console.log("No token found in localStorage for request");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  const fetchUser = async (token) => {
    try {
      console.log("Fetching user with token:", token);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setIsLoggedIn(true);
      console.log("User fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (isLoggedIn) {
        logout();
      }
    }
  };

  const login = (token) => {
    console.log("Storing token in localStorage:", token);
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    fetchUser(token);
  };

  const logout = () => {
    console.log("Removing token from localStorage");
    localStorage.removeItem("accessToken");
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
