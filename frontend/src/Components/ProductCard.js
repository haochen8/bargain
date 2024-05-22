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
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

/**
 * The ProductCard component.
 *
 * @param {*} param0
 * @returns
 */
const ProductCard = ({ id, title, image, price, description, rating }) => {
  let navigate = useNavigate();

  /**
   * Handles the add to wishlist process.
   */
  const handleAddToWishList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add to wishlist");
        navigate("/login");
        return;
      }
      console.log("Token:", token);
      console.log("Product ID:", id);

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/wishlist`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Product added to wishlist");
        navigate("/wishlist");
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      console.log("Response data:", error.response.data);
      console.error(error);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body product-card">
        <div className="wishlist-icon position-absolute">
          <button
            className="btn btn-link p-0 border-0"
            onClick={handleAddToWishList}
          >
            <img src="images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div className="mb-3">
          <img
            src={image}
            alt="product"
            className="img-fluid"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        </div>
        <h6 className="product-title text-center">{title}</h6>
        <p className="price text-center">{price}kr</p>
        <p className="description text-center">{description}</p>
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
