/**
 * The Blogs component of the website.
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

  // Fetch products
  useEffect(() => {
    fetchWishListProducts();
  }, []);

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
        console.log("Fetched Wishlist Products: ", response.data); // Log to check data structure
        setProducts(response.data);
      } else {
        console.error("Failed to fetch products", response);
      }
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    }
  };
  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
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
                  description={product.description}
                  rating={product.rating}
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
