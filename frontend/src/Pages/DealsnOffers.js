/**
 * The DealsnOffers component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";

const DealsnOffers = () => {
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

  const [grid, setGrid] = useState(4);

  return (
    <>
      <Meta title="New Arrivals" />
      <BreadCrumb title="New Arrivals" />
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
              {/* Random Products */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Products</h3>
                <div className="random-products d-flex flex-wrap">
                  {" "}
                  {/* Updated for wrapping */}
                  {/* Product 1 */}
                  <div className="product-item w-50 p-2">
                    <img
                      src="images/beats.jpg"
                      className="img-fluid"
                      alt="Beats by Dre"
                    />
                    <div className="product-info">
                      <h5>Beats by Dre</h5>
                      <b>2500kr</b>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  {/* Product 2 */}
                  <div className="product-item w-50 p-2">
                    <img
                      src="images/applewatch.jpg"
                      className="img-fluid"
                      alt="Apple Watch Series 9"
                    />
                    <div className="product-info">
                      <h5>Apple Watch Series 9</h5>
                      <b>5499kr</b>
                      <ReactStars
                        count={5}
                        size={24}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  {/* Product 3 */}
                  <div className="product-item w-50 p-2">
                    <img
                      src="images/bose.jpg"
                      className="img-fluid"
                      alt="Bose Headphones"
                    />
                    <div className="product-info">
                      <h5>Bose</h5>
                      <b>1000kr</b>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  {/* Product 4 */}
                  <div className="product-item w-50 p-2">
                    <img
                      src="images/grill.jpg"
                      className="img-fluid"
                      alt="George Foreman Grill"
                    />
                    <div className="product-info">
                      <h5>George Foreman Grill</h5>
                      <b>799kr</b>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
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
                  {[...Array(grid)].map((_, index) => (
                    <ProductCard key={index} />
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

export default DealsnOffers;
