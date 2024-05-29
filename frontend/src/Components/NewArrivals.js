/**
 * Renders the New Arrivals page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The New Arrivals page component.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

/**
 * Handles stock status and sizes.
 *
 * @returns {JSX.Element} The New Arrivals page component.
 */
const NewArrivals = () => {
  const [stockStatus, setStockStatus] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [sizes, setSizes] = useState("");
  const [products, setProducts] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
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
   * Fetch products from the backend.
   */
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handle change and blur the checkbox
   *
   * @param {*} event - The event object.
   */
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    if (id in stockStatus) {
      setStockStatus((prev) => ({ ...prev, [id]: checked }));
    } else if (id in sizes) {
      setSizes((prev) => ({ ...prev, [id]: checked }));
    }

    event.target.blur();
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
              <h3 className="section-heading">New Arrivals</h3>
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

export default NewArrivals;
