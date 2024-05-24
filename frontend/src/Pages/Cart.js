/**
 * @file Cart.js is the cart page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";

const Cart = () => {
  // const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  // const handleQuantityChange = (e) => {
  //   setQuantity(parseInt(e.target.value, 10));
  // };

  /**
   * Handles the checkout process.
   */
  const handleCheckout = async () => {
    // Create an order
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/cart/-create-order`
      );
      clearCart();
      navigate(`/order/${response.data.order.id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container">
          <h2>Your Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id}>
                <h5>{item.product.name}</h5>
                <p>Quantity: {item.count}</p>
                <p>Price: {item.product.price} kr</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} className="btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
