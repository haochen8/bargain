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
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { useEffect } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";

/**
 * The Header component.
 *
 * @returns {JSX.Element} The rendered application.
 */
const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();

  useEffect(() => {}, [user]);

  // Calculate the total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  // Calculate the total price of the items in the cart
  const cartTotalPrice = cart.reduce(
    (total, item) => total + item.count * item.product.price,
    0
  );

  /**
   * Handles the search query change event.
   *
   * @param {Event} e
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  /**
   * Handles the enter key press event.
   *
   * @param {Event} e
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  /**
   * Handles the logout process.
   */
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
        {}, // Ensure body is empty as the method is POST
        {
          withCredentials: true, // Ensure credentials (cookies) are included
        }
      );

      if (response.status !== 200) {
        setError("Logout failed: " + response.data.message);
      } else {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred, please try again.");
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
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={handleSearch}
                >
                  <BsSearch className="fs-5" />
                </button>
              </div>
            </div>
            <div className="col-lg-1 col-md-3 col-sm-6 col-12">
              <div className="header-upper-links">
                {isLoggedIn && (
                  <div>
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-10 text-white me-5"
                    >
                      <CiHeart className="fs-3 me-2" alt="wishlist" />
                      <p className="mb-0">
                        Favourites <br /> Wishlist
                      </p>
                    </Link>
                  </div>
                )}
                <div>
                  {isLoggedIn ? (
                    <span
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-10 text-white me-5"
                      style={{ cursor: "pointer" }}
                    >
                      <CgProfile className="fs-3 me-2" alt="user" />
                      <p>Logout</p>
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white me-5"
                    >
                      <CgProfile className="fs-3 me-2" alt="user" />

                      <p>Login</p>
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center text-white"
                  >
                    <IoBagOutline className="fs-3 me-2" alt="cart" />

                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartItemCount}
                      </span>
                      <p className="mb-0">{cartTotalPrice}kr</p>
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
                        <Link
                          className="dropdown-item text-white"
                          to="/electronics"
                        >
                          Electronics
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="/skincare"
                        >
                          Skin Care
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="/healthnfitness"
                        >
                          Health & Fitness
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="/fashion"
                        >
                          Fashion
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="/kitchen"
                        >
                          Kitchen
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="navlinks d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/NewArrivals">New Products</NavLink>
                    <NavLink to="/Blogs">Blogs</NavLink>
                    <NavLink to="/Contact">Contact</NavLink>
                    {isLoggedIn && user?.role === "admin" && (
                      <NavLink to="/add-product">Add Product</NavLink>
                    )}
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
