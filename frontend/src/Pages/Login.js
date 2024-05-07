import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth">
                <h3 className="loginh3 text-center mb-3">Login</h3>
                <form action="" className="d-flex flex-column gap-10">
                  <div>
                    <input
                      type="username"
                      name="username"
                      placeholder="Username or Email"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    />
                    {/* <Link className="forgot mt-3" to="/forgotpassword">
                      Forgot Password?
                    </Link> */}
                  </div>
                  <div>
                    <div className="d-flex justify-content-center align-items-center gap-15">
                      <button className="button" type="submit">
                        Login
                      </button>
                      <Link className="button" to="/signup">
                        Sign Up
                      </Link>
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
