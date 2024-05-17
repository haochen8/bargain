import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState([]);
  const [color, setColor] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files].map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price,
      category,
      brand,
      quantity,
      images,
      color
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product`, productData);
      console.log(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Brand</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      </div>
      <div>
        <label>Color</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={handleImageChange} />
        <div>
          {images.map((image, index) => (
            <img key={index} src={image} alt="preview" width="100" />
          ))}
        </div>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
