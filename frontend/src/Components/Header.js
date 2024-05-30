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
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setError("No refresh token found, unable to logout.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
        { refreshToken }, // Send the refresh token in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        setError("Logout failed: " + response.data.message);
      } else {
        localStorage.removeItem("refreshToken"); // Remove the refresh token from localStorage
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred, please try again.");
    }
  };

  /**
   * Handles the wishlist click event.
   * @param {*} e event
   */
  const handleWishlistClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate("/wishlist");
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
      <header className="header-main py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6 col-md-2">
              <h2>
                <Link to="/" className="text-white">
                  Bargain
                </Link>
              </h2>
            </div>
            <div className="col-12 col-md-7 my-2 my-md-0">
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
            <div className="col-6 col-md-3">
              <div className="header-links d-flex  gap-5">
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center gap-2 text-white"
                  onClick={handleWishlistClick}
                >
                  <CiHeart className="fs-3" alt="wishlist" />
                  <span className="d-inline ">Wishlist</span>
                </Link>
                {isLoggedIn ? (
                  <span
                    onClick={handleLogout}
                    className="d-flex align-items-center gap-10 text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <CgProfile className="fs-3" alt="user" />
                    <span className="d-inline">Logout</span>
                  </span>
                ) : (
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-1 text-white"
                  >
                    <CgProfile className="fs-3" alt="user" />
                    <span className="d-inline">Login</span>
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="d-flex align-items-center gap-1 text-white"
                >
                  <IoBagOutline className="fs-3" alt="cart" />
                  <div className="d-flex flex-column align-items-center">
                    <span className="badge bg-white text-dark">
                      {cartItemCount}
                    </span>
                    <span className="d-inline">{cartTotalPrice}kr</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-3">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-2 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu_list.png" alt="menu" />{" "}
                      <span className="me-2 d-inline-block">Categories</span>
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
                  <div className="navlinks d-flex align-items-center gap-2">
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
