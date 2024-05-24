/**
 * Renders the New Arrivals page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The SingleProduct component.
 * @version 3.1.0
 */

import React, { useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/**
 * Renders the Single Product component.
 *
 * @returns {JSX.Element} The rendered SingleProduct component.
 */
const SingleProduct = () => {
  // Declare the state variables
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  /**
   * Fetches the product data by ID.
   */
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`
      );
      if (response.data) {
        setProduct(response.data);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch the product data on component mount
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Display the main image and other images
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "default-image-url";
  const otherImages =
    product.images && product.images.length > 1 ? product.images.slice(1) : [];

  return (
    <>
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <Zoom>
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="img-fluid main-image"
                  />
                </Zoom>
              </div>
              {/* Display the other images as small images */}
              <div className="bottom-images d-flex gap-2">
                {otherImages.slice(0, 2).map((image, index) => (
                  <div key={index} className="col">
                    <Zoom>
                      <img
                        src={image}
                        alt={product.title}
                        className="img-fluid small-image"
                      />
                    </Zoom>
                  </div>
                ))}
              </div>
            </div>
            {/* Display the product details */}
            <div className="col-6">
              <div className="main-product-details">
                <div className="title">
                  <h4>{product.title}</h4>
                </div>
                <div className="">
                  <p className="price">{product.price} kr</p>
                  <div className="product-sizes">
                    <h3 className="product-header">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      {product.sizes &&
                        product.sizes.map((size) => (
                          <span
                            key={size}
                            className={`badge ${
                              selectedSize === size
                                ? "bg-secondary"
                                : "bg-white text-dark"
                            } border-secondary`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="product-colors my-3">
                    <h3 className="product-header">Color:</h3>
                    <select
                      className="form-select"
                      value={selectedColor}
                      style={{ cursor: "pointer" }}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Select Color</option>
                      {product.colors &&
                        product.colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="product-quantity my-3">
                    <h3 className="product-header">Quantity:</h3>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="form-control quantity-input"
                    />
                  </div>
                  <button className="button btn-primary my-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="product-description bg-white p-3">
                <h4>Product Description</h4>
                {product.description && <h5>{product.description}</h5>}
                {product.description &&
                  Array.isArray(product.description) &&
                  product.descriptionImages.length > 0 &&
                  product.descriptionImages.map((imageUrl, index) => (
                    <div key={index} className="description-image-wrapper mb-2">
                      <img
                        src={imageUrl}
                        alt={`Description ${index + 1}`}
                        className="description-image img-fluid"
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

export default SingleProduct;
