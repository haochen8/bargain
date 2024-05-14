import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError("Logout failed: " + errorData.message);
      } else {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setError("An unexpected error happened occurred, please try again.");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
