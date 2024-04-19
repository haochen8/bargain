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
import BestSeller from "../Components/BestSeller";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

const WishList = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="button-container">
              {isVisible && (
                <div className="close-container">
                  <BestSeller />
                  <button onClick={handleClose} className="close-button">
                    <IoIosClose size={20} color="#000" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
