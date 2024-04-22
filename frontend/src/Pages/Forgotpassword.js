import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  return (
    <>
      <Meta title="Forgotpassword" />
      <BreadCrumb title="Forgotpassword" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth">
                <h3 className="loginh3 text-center mb-3">Reset</h3>
                <p className="reset text-center my-2">
                  Enter your E-mail to reset your password
                </p>
                <form action="" className="d-flex flex-column">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="form-control"
                    />
                  </div>
                </form>
                <div>
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
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
      </div>
    </>
  );
};

export default Forgotpassword;
