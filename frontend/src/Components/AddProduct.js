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

/**
 * The AddProduct component.
 *
 * @param {Object} props - The component props
 * @returns {JSX.Element} The rendered AddProduct component.
 */
const AddProduct = ({ onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bottomImageUrl1, setBottomImageUrl1] = useState("");
  const [bottomImageUrl2, setBottomImageUrl2] = useState("");
  const [color, setColor] = useState("");
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
      description,
      price,
      category,
      brand,
      quantity,
      images: [imageUrl, bottomImageUrl1, bottomImageUrl2].filter(Boolean), // Filter out empty strings
      color,
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
    setDescription("");
    setPrice("");
    setCategory("");
    setBrand("");
    setQuantity("");
    setImageUrl("");
    setBottomImageUrl1("");
    setBottomImageUrl2("");
    setColor("");
  };

  /**
   * Handles the delete product event.
   */
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
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
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
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
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              id="color"
              className="form-control"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </div>
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

      <div className="mt-5">
        <h3>Added Products:</h3>
        <div className="row">
          {addedProducts.map((product) => (
            <div key={product.id} className="col-3 -md-4 mb-3 d-flex flex-column align-items-center">
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
