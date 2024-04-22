import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";

const Resetpassword = () => {
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="auth">
                <h3 className="loginh3 text-center mb-3">Reset Password</h3>
                <p className="reset text-center my-2">Enter New Password</p>
                <form action="" className="d-flex flex-column ">
                  <div>
                    <input
                      type="newpassword"
                      name="newpassword"
                      placeholder="New Password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="confirmpassword"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      className="form-control"
                    />
                  </div>
                </form>
                <div>
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <button className="button border-0" type="submit">
                      Reset
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

export default Resetpassword;
