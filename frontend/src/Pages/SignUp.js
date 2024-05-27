import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password.length < 10) {
      setError("Password must be at least 10 characters long.");
      return;
    }

    try {
      const payload = {
        username,
        email,
        password,
        firstName,
        lastName,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError("Failed to sign up, please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred, please try again.");
    }
  };

  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth">
                <h3 className="loginh3 text-center mb-3">Create an account</h3>
                <p className="reset text-center my-2">Enter your information</p>
                <form onSubmit={handleSignUp} className="d-flex flex-column ">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && (
                    <div className="text-center text-danger mt-2">{error}</div>
                  )}
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Create
                    </button>
                  </div>
                </form>
                <Link
                  className="submit mt-2 d-flex justify-content-center align-items-center"
                  to={"/login"}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
