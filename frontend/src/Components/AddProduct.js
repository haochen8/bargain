/**
 * @file AddProduct.js is the page for adding a product.
 *
 * @author Hao Chen
 * @returns {JSX.Element} The AddProduct page component.
 * @author: Hao Chen
 * @version: 1.0
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import { set } from "mongoose";

/**
 * The AddProduct component.
 *
 * @param {Object} props - The component props
 * @returns {JSX.Element} The rendered AddProduct component.
 */
const AddProduct = ({ onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [descriptionImageUrl, setDescriptionImageUrl] = useState("");
  const [descriptionImageUrls, setDescriptionImageUrls] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bottomImageUrl1, setBottomImageUrl1] = useState("");
  const [bottomImageUrl2, setBottomImageUrl2] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  /**
   * Fetches the added products.
   */
  const fetchAddedProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product`
      );
      setAddedProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Use effect to fetch added products
  useEffect(() => {
    fetchAddedProducts();
  }, []);

  /**
   * Handles the form submit event.
   *
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      description: descriptionImageUrls,
      price,
      category,
      brand,
      quantity,
      images: [imageUrl, bottomImageUrl1, bottomImageUrl2].filter(Boolean), // Filter out empty strings
      colors,
      sizes,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/add-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Product added successfully!");
      onProductAdded(response.data);
      setAddedProducts([...addedProducts, response.data]);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Resets the form fields.
   */
  const resetForm = () => {
    setTitle("");
    setDescriptionImageUrl("");
    setDescriptionImageUrls([]);
    setPrice("");
    setCategory("");
    setBrand("");
    setQuantity("");
    setImageUrl("");
    setBottomImageUrl1("");
    setBottomImageUrl2("");
    setColor("");
    setColors([]);
    setSize("");
    setSizes([]);
  };

  /**
   * Handles the delete product event.
   */
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddedProducts(
        addedProducts.filter((product) => product.id !== productId)
      );
      setSuccessMessage("Product deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the add color event.
   */
  const handleAddColor = () => {
    if (colors && !colors.includes(color)) {
      setColors([...colors, color]);
      setColor("");
    }
  };

  /**
   * Handles the add size event.
   */
  const handleAddSize = () => {
    if (sizes && !sizes.includes(size)) {
      setSizes([...sizes, size]);
      setSize("");
    }
  };

  const handleAddDescriptionImageUrl = () => {
    if (
      descriptionImageUrl &&
      !descriptionImageUrls.includes(descriptionImageUrl)
    ) {
      setDescriptionImageUrls([...descriptionImageUrls, descriptionImageUrl]);
      setDescriptionImageUrl("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Product</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
        {/* Form fields */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Description Image URL */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="descriptionImageUrl" className="form-label">
              Description Image URL
            </label>
            <div className="input-group">
              <input
                type="url"
                id="descriptionImageUrl"
                className="form-control"
                value={descriptionImageUrl}
                onChange={(e) => setDescriptionImageUrl(e.target.value)}
              />
              <button
                type="button"
                className="button btn-secondary"
                onClick={handleAddDescriptionImageUrl}
              >
                Add Image
              </button>
            </div>
            <div className="mt-2">
              {descriptionImageUrls.map((url, index) => (
                <div key={index} className="mb-2">
                  <img
                    src={url}
                    alt={`Description ${index + 1}`}
                    className="img-thumbnail"
                    width="100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Price */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Category */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Brand */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Quantity */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Add color */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="colors" className="form-label">
              Color
            </label>
            <div className="input-group">
              <input
                type="text"
                id="colors"
                className="form-control"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button
                type="button"
                className="button btn-secondary"
                onClick={handleAddColor}
              >
                Add Color
              </button>
            </div>
            <div className="mt-2">
              {colors.map((col, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="sizes" className="form-label">
              Size
            </label>
            <div className="input-group">
              <input
                type="text"
                id="sizes"
                className="form-control"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <button
                type="button"
                className="button btn-secondary"
                onClick={handleAddSize}
              >
                Add Size
              </button>
            </div>
            <div className="mt-2">
              {sizes.map((sz, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {sz}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Main image URL */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="image-url" className="form-label">
              Main Image URL
            </label>
            <input
              type="url"
              id="image-url"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                className="img-thumbnail mt-3"
                width="100"
              />
            )}
          </div>
        </div>
        {/* Bottom image URL 1 */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="bottom-image-url-1" className="form-label">
              Bottom Image URL 1
            </label>
            <input
              type="url"
              id="bottom-image-url-1"
              className="form-control"
              value={bottomImageUrl1}
              onChange={(e) => setBottomImageUrl1(e.target.value)}
            />
            {bottomImageUrl1 && (
              <img
                src={bottomImageUrl1}
                alt="preview"
                className="img-thumbnail mt-3"
                width="100"
              />
            )}
          </div>
        </div>
        {/* Bottom image URL 2 */}
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="bottom-image-url-2" className="form-label">
              Bottom Image URL 2
            </label>
            <input
              type="url"
              id="bottom-image-url-2"
              className="form-control"
              value={bottomImageUrl2}
              onChange={(e) => setBottomImageUrl2(e.target.value)}
            />
            {bottomImageUrl2 && (
              <img
                src={bottomImageUrl2}
                alt="preview"
                className="img-thumbnail mt-3"
                width="100"
              />
            )}
          </div>
        </div>
        <div className="col-md-8 text-center">
          <button type="submit" className="button btn-primary">
            Add Product
          </button>
        </div>
      </form>
      {/* Added products */}
      <div className="mt-5">
        <h3>Added Products:</h3>
        <div className="row">
          {addedProducts.map((product) => (
            <div
              key={product.id}
              className="col-3 -md-4 mb-3 d-flex flex-column align-items-center"
            >
              <ProductCard
                id={product.id}
                title={product.title}
                image={
                  product.images && product.images[0]
                    ? product.images[0]
                    : "default-image-url"
                }
                price={product.price}
              />
              <button
                className="delete-btn btn-danger mt-2"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AddProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
};

export default AddProduct;
