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
        <div className="row">
          <div className="col-12">
            <div className="auth">
              <h3 className="login">Login</h3>
              <form action="">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                </div>
                <div>
                  <Link to='/forgotpassword'>Forgot Password?</Link>
                  <div className="d-flex justify-content-center align-items-center gap-15">
                      <button className="button">Login</button>
                      <Link className="button" to='/signup'>Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
