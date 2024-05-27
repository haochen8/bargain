/**
 * This component displays products in the Home Products category.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The Home Products page component.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

/**
 * Handles displaying products in the Home Products category.
 *
 * @returns {JSX.Element} The Home Products page component.
 */
const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);

  // Fetch products in the Home Products category
  useEffect(() => {
    fetchHomeProducts();
  }, []);

  // Display flash message and close it after 3 seconds
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  /**
   * Fetch Home Products from the backend.
   */
  const fetchHomeProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product?category=HomeProducts`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}
      <div className="store-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              {/* Categories */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li><Link to="/electronics" className="category-link"><span>Electronics</span></Link></li>
                    <li><Link to="/fashion" className="category-link"><span>Fashion</span></Link></li>
                    <li><Link to="/home-products" className="category-link"><span>Home Products</span></Link></li>
                    <li><Link to="/skincare" className="category-link"><span>Skincare</span></Link></li>
                    <li><Link to="/healthnfitness" className="category-link"><span>Health & Fitness</span></Link></li>
                    <li><Link to="/kitchen" className="category-link"><span>Kitchen</span></Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
            <h3 className="section-heading">Home Essentials</h3>
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-3 mb-4">
                      <ProductCard
                        id={product.id} // Updated to use product.id
                        title={product.title}
                        image={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "default-image-url"
                        }
                        price={product.price}
                        setFlashMessage={(type, message) => {
                          setFlashMessage({ type, message });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default HomeProducts;
