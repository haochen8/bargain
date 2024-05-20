/**
 * The Blogs component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const WishList = () => {
  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wish-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3 p-2">
              <div className="best-seller position-relative">
                <div className="wishlist-icon position-absolute">
                  <Link>
                    <img src="images/wish.svg" alt="" />
                  </Link>
                </div>
                <button className="close-button">
                  <IoIosClose size={24} />
                </button>
                <div>
                  <img
                    src="images/watch.jpg"
                    alt="productimg"
                    className="img-fluid"
                  />
                </div>
                <div className="product-detail">
                  <h5 className="product-title">Apple Watch </h5>
                  <p className="price">3000kr</p>
                  <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil explicabo temporibus molestias...
                  </p>
                  <ReactStars
                    count={5}
                    size={24}
                    value="4"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <Link>
                      <img src="images/view.svg" alt="view" />
                    </Link>
                    <Link>
                      <img src="images/add-cart.svg" alt="add-cart" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="best-seller position-relative">
                <div className="wishlist-icon position-absolute">
                  <Link>
                    <img src="images/wish.svg" alt="" />
                  </Link>
                </div>
                <button className="close-button">
                  <IoIosClose size={24} />
                </button>
                <div>
                  <img
                    src="images/watch.jpg"
                    alt="productimg"
                    className="img-fluid"
                  />
                </div>
                <div className="product-detail">
                  <h5 className="product-title">Apple Watch </h5>
                  <p className="price">3000kr</p>
                  <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil explicabo temporibus molestias...
                  </p>
                  <ReactStars
                    count={5}
                    size={24}
                    value="4"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <Link>
                      <img src="images/view.svg" alt="view" />
                    </Link>
                    <Link>
                      <img src="images/add-cart.svg" alt="add-cart" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="best-seller position-relative">
                <div className="wishlist-icon position-absolute">
                  <Link>
                    <img src="images/wish.svg" alt="" />
                  </Link>
                </div>
                <button className="close-button">
                  <IoIosClose size={24} />
                </button>
                <div>
                  <img
                    src="images/watch.jpg"
                    alt="productimg"
                    className="img-fluid"
                  />
                </div>
                <div className="product-detail">
                  <h5 className="product-title">Apple Watch </h5>
                  <p className="price">3000kr</p>
                  <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil explicabo temporibus molestias...
                  </p>
                  <ReactStars
                    count={5}
                    size={24}
                    value="4"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <Link>
                      <img src="images/view.svg" alt="view" />
                    </Link>
                    <Link>
                      <img src="images/add-cart.svg" alt="add-cart" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 p-2">
              <div className="best-seller position-relative">
                <div className="wishlist-icon position-absolute">
                  <Link>
                    <img src="images/wish.svg" alt="" />
                  </Link>
                </div>
                <button className="close-button">
                  <IoIosClose size={24} />
                </button>
                <div>
                  <img
                    src="images/watch.jpg"
                    alt="productimg"
                    className="img-fluid"
                  />
                </div>
                <div className="product-detail">
                  <h5 className="product-title">Apple Watch </h5>
                  <p className="price">3000kr</p>
                  <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil explicabo temporibus molestias...
                  </p>
                  <ReactStars
                    count={5}
                    size={24}
                    value="4"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <Link>
                      <img src="images/view.svg" alt="view" />
                    </Link>
                    <Link>
                      <img src="images/add-cart.svg" alt="add-cart" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
