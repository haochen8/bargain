/**
 * The Wishlist page.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * The Wishlist page.
 *
 * @returns {JSX.Element} The wishlist page.
 */
const WishList = () => {
  const [products, setProducts] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");

  // Fetch products
  useEffect(() => {
    fetchWishListProducts();
  }, []);

  // Set a timeout to remove the flash message
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  /**
   * Fetch products from the backend.
   */
  const fetchWishListProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Failed to fetch products", response);
      }
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    }
  };

  /**
   * Handles the removal of a product from the wishlist.
   * @param {string} productId - The ID of the product to remove.
   */
  const handleRemoveFromWishlist = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}
      <div className="store-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-3 mb-4">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={
                    product.images && product.images[0]
                      ? product.images[0]
                      : "default-image-url"
                  }
                  price={product.price}
                  rating={product.rating}
                  setFlashMessage={(type, message) => {
                    setFlashMessage({ type, message });
                  }}
                  removeFromWishlist={handleRemoveFromWishlist} // Pass the handler to ProductCard
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
