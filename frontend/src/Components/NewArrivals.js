/**
 * Renders the New Arrivals page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The New Arrivals page component.
 */

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./ProductCard";

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
  const [sizes, setSizes] = useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
  });

  const [grid, setGrid] = useState(4);
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
                    <li>Electronics</li>
                    <li>Fashion</li>
                    <li>Home Products</li>
                    <li>Skin Care</li>
                  </ul>
                </div>
              </div>
              {/* Availability Filters */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter</h3>
                <h5 className="sub-title">Availability</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={stockStatus.inStock}
                    id="inStock"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock (10)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={stockStatus.outOfStock}
                    id="outOfStock"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="outOfStock">
                    Out of Stock (10)
                  </label>
                </div>
                {/* Price filter */}
                <h5 className="sub-title">Price</h5>
                <h6>SEK</h6>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
                {/* Colors filter*/}
                <h5 className="sub-title">Colors</h5>
                <div className="d-flex flex-wrap">
                  <div className="colors">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </div>
                </div>
                {/* Sizes filter */}
                <h5 className="sub-title">Sizes</h5>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <div key={size} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={sizes[size]}
                      id={size}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={size}>
                      {size}
                    </label>
                  </div>
                ))}
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
