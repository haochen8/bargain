/**
 * @file AddProduct.js is the page for adding a product.
 *
 * @author Hao Chen
 * @returns {JSX.Element} The AddProduct page component.
 * @author: Hao Chen
 * @version: 1.0
 */

import React, { useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const AddProduct = ({ onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("");
  const [addedProduct, setAddedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      price,
      category,
      brand,
      quantity,
      images: [imageUrl], // Convert the image URL to an array of URLs
      color,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/add-product`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddedProduct(response.data);
      setSuccessMessage("Product added successfully!");
      onProductAdded(response.data);
      console.log(response.data);
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
        <div className="col-md-8">
          <div className="mb-3 text-center">
            <label htmlFor="title" className="form-label">Title</label>
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
            <label htmlFor="description" className="form-label">Description</label>
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
            <label htmlFor="price" className="form-label">Price</label>
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
            <label htmlFor="category" className="form-label">Category</label>
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
            <label htmlFor="brand" className="form-label">Brand</label>
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
            <label htmlFor="quantity" className="form-label">Quantity</label>
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
            <label htmlFor="color" className="form-label">Color</label>
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
            <label htmlFor="image-url" className="form-label">Image URL</label>
            <input
              type="url"
              id="image-url"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            {imageUrl && <img src={imageUrl} alt="preview" className="img-thumbnail mt-3" width="100" />}
          </div>
        </div>
        <div className="col-md-8 text-center">
          <button type="submit" className="button btn-primary">Add Product</button>
        </div>
      </form>

      {addedProduct && (
        <div className="mt-5">
          <h3>Product Added:</h3>
          <ProductCard
            id={addedProduct._id}
            title={addedProduct.title}
            image={addedProduct.images && addedProduct.images[0] ? addedProduct.images[0] : 'default-image-url'} // Access the first image URL safely
            price={addedProduct.price}
            description={addedProduct.description}
          />
        </div>
      )}
    </div>
  );
};

AddProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
};

export default AddProduct;
