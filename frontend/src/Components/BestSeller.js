/**
 * Renders the Best seller page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The Best seller page component.
 */

import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const BestSeller = (props) => {
  let location = useLocation();

  return (
    <div
      className= "col-3"
    >
      <Link to=':id' className="best-seller position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <img src="images/wish.svg" alt="" />
          </Link>
        </div>
        <div>
          <img src="images/watch.jpg" alt="productimg" className="img-fluid" />
        </div>
        <div className="product-detail">
          <h5 className="product-title">Apple Watch </h5>
          <p className="price">3000kr</p>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            explicabo temporibus molestias...
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
      </Link>
    </div>
  );
};



export default BestSeller;
