/**
 * Renders the Product Card component.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.id - The product ID
 * @param {string} props.title - The product title
 * @param {string} props.image - The product image URL
 * @param {string} props.price - The product price
 * @param {string} props.descriptionUrl - The product description
 * @returns {JSX.Element} The Product Card component.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { CiCircleRemove, CiHeart, CiShoppingCart } from "react-icons/ci";
import { useCart } from "../Context/CartContext";

/**
 * The ProductCard component.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered ProductCard component.
 */
const ProductCard = ({
  id,
  title,
  image,
  price,
  descriptionUrl,
  setFlashMessage,
  removeFromWishlist,
}) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useCart();
  const [isInWishList, setIsInWishList] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, []);

  /**
   * Checks the wishlist status.
   *
   */
  const checkWishlistStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check if the product is in the wishlist
      const wishlist = response.data;
      const productInWishlist = wishlist.some((product) => product.id === id);
      setIsInWishList(productInWishlist);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  };

  /**
   * Handles the add to wishlist process.
   */
  const handleAddToWishList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setFlashMessage("info", "Please login to add to wishlist");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/wishlist`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check the response status and display a flash message
      if (response.status === 200) {
        const message = response.data.message;
        setIsInWishList((prev) => !prev);
        if (message.includes("removed")) {
          setFlashMessage("error", "Product removed from wishlist");
          if (removeFromWishlist) {
            removeFromWishlist(id);
          }
        } else if (message.includes("added")) {
          setFlashMessage("success", "Product added to wishlist");
        }
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setFlashMessage("error", "Error managing wishlist. Please try again.");
    }
  };

  /**
   * Handles the add to cart process.
   */
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setFlashMessage("info", "Please login to add to cart");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const productData = {
        product: id,
        count: 1,
      };

      await addToCart(productData);
      setFlashMessage("success", "Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setFlashMessage("error", "Error adding to cart. Please try again.");
    }
  };

  // Truncate long product titles
  const truncateTitle = (title, maxLength = 20) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className="card h-100">
      <div className="card-body product-card">
        <div className="wishlist-icon position-absolute">
          <button
            className="btn btn-link p-0 border-0"
            onClick={handleAddToWishList}
          >
            {isInWishList ? (
              <CiCircleRemove size={20} color="black" />
            ) : (
              <CiHeart size={20} color="red" />
            )}
          </button>
        </div>
        <button
          className="btn btn-link p-0 border-0 cart-icon"
          onClick={handleAddToCart}
        >
          <CiShoppingCart size={20} color="black" />
        </button>
        <div className="mb-3" onClick={() => navigate(`/product/${id}`)}>
          <img src={image} alt="product" className="img-fluid product-image" />
          <h6 className="product-title text-center">{truncateTitle(title)}</h6>
          <p className="price text-center">{price}kr</p>
          <p className="description text-center">{descriptionUrl}</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  descriptionUrl: PropTypes.string,
  setFlashMessage: PropTypes.func,
  removeFromWishlist: PropTypes.func,
};

export default ProductCard;
