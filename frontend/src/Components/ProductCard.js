/**
 * Renders the Product Card component.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.id - The product ID
 * @param {string} props.title - The product title
 * @param {string} props.image - The product image URL
 * @param {string} props.price - The product price
 * @param {string} props.description - The product description
 * @returns {JSX.Element} The Product Card component.
 */

import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ id, title, image, price, description, rating }) => {
  let location = useLocation();

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <div className="wishlist-icon position-absolute">
          <button className="btn btn-link p-0 border-0">
            <img src="images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div className="mb-3">
          <img src={image} alt="product" className="img-fluid" style={{ maxHeight: "200px", objectFit: "contain" }} />
        </div>
        <h6 className="product-title">{title}</h6>
        <p className="price">{price}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ProductCard;
