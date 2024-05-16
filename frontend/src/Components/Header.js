/**
 * The Header component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
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
    <>
      <header className="header-top-strip">
        <div className="container">
          <div className="row">
            <Marquee className="d-flex text-white">
              <p className="mb-0">
                FREE SHIPPING spending over 500kr
                <span className="spacing">Call: +46 (110)-123456</span>
              </p>
            </Marquee>
          </div>
        </div>
      </header>
      <header className="header-upper py-3"></header>
      <header className="header-upper py-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-3 col-sm-6 col-12 me-lg-3">
              <h2>
                <Link to="/" className="text-white">
                  Bargain
                </Link>
              </h2>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-4 col-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <button className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-5" />
                </button>
              </div>
            </div>
            <div className="col-lg-1 col-md-3 col-sm-6 col-12">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {isLoggedIn && (
                  <div>
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-10 text-white me-5"
                    >
                      <img src="images/wishlist.svg" alt="wishlist" />
                      <p className="mb-0">
                        Favourites <br /> Wishlist
                      </p>
                    </Link>
                  </div>
                )}
                <div>
                  {isLoggedIn ? (
                    <a
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-10 text-white me-5"
                      style={{ cursor: "pointer" }}
                    >
                      <img src="images/user.svg" alt="user" />
                      <p>Logout</p>
                    </a>
                  ) : (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white me-5"
                    >
                      <img src="images/user.svg" alt="user" />
                      <p>Login/Profile</p>
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center text-white"
                  >
                    <img src="images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">500kr</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu_list.png" alt="menu" />{" "}
                      <span className="me-5 d-inline-block">Categories</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="navlinks d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Product">Products</NavLink>
                    <NavLink to="/DealsnOffers">Deals/Offers</NavLink>
                    <NavLink to="/Blogs">Blogs</NavLink>
                    <NavLink to="/Contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
