/**
 * This component displays products in the Health & Fitness category.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

/**
 * Handles displaying products in the HealthnFitness category.
 *
 * @returns {JSX.Element} The HealthnFitness page component.
 */
const HealthnFitness = () => {
  const [products, setProducts] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);

  // Fetch products in the HealthnFitness category
  useEffect(() => {
    fetchHealthnFitnessProducts();
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
   * Fetch HealthnFitness products from the backend.
   */
  const fetchHealthnFitnessProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product?category=HealthnFitness`
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
                    <li>
                      <Link to="/electronics" className="category-link">
                        <span>Electronics</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/fashion" className="category-link">
                        <span>Fashion</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/home-products" className="category-link">
                        <span>Home Products</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/skincare" className="category-link">
                        <span>Skincare</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/healthnfitness" className="category-link">
                        <span>Health & Fitness</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/kitchen" className="category-link">
                        <span>Kitchen</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <h6 className="mb-0 d-block" style={{ width: "50px" }}>
                      Sort:
                    </h6>
                    <select name="" className="form-control form-select" id="">
                      <option value="newest">Newest</option>
                      <option value="most-popular">Most Popular</option>
                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
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
      </div>
    </>
  );
};

export default HealthnFitness;
