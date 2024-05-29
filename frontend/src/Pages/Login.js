/**
 * @file Login.js is the page where the user can login to the application.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * The Login component.
 * 
 * @returns {JSX.Element} The rendered application.
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Handles the login event.
   * 
   * @param {*} event 
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username,
        password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token); // Store the refresh token in localStorage
        login(access_token);
        navigate("/");
      } else {
        setError("Invalid username or password, please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("Invalid username or password, please try again.");
    }
  };

  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
              <div className="auth">
                <h3 className="loginh3 text-center mb-3">Login</h3>
                <form
                  onSubmit={handleLogin}
                  className="d-flex flex-column gap-10"
                >
                  <div>
                    <input
                      type="username"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="form-control"
                    />
                    <Link className="d-flex justify-content-end align-items-center mt-4" to="/signup">
                      Sign Up
                    </Link>
                    {/* <Link className="forgot mt-3" to="/forgotpassword">
                      Forgot Password?
                    </Link> */}
                  </div>
                  <div className="text-center text-danger">{error}</div>
                  <div>
                    <div className="d-flex justify-content-center align-items-center gap-15">
                      <button className="btn btn-primary w-100" type="submit">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
