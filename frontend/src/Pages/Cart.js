/**
 * @file Cart.js is the cart page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useCart();

  /**
   * Handles the checkout process.
   */
  const handleCheckout = async () => {
    // Create an order
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user is not logged in.");
        throw new Error("User not logged in");
      }
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      clearCart();
      navigate(`/order/${response.data.order.id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // If the cart is empty, display a message
  if (!cart || cart.length === 0) {
    return (
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
        </div>
      </section>
    );
  }

  // Calculate the total price of the cart
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.count, 0);


  return (
    <>
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <h2>Your Cart</h2>
          <div className="row">
            {cart.map((item) => (
              <div key={item.product.id} className="col-md-4 d-flex flex-column align-items-center mb-4">
                <div>
                  {item.product.images && item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="img-fluid mb-2"
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    <div
                      style={{
                        maxWidth: "100px",
                        height: "100px",
                        backgroundColor: "#eaeaea",
                        marginBottom: "10px"
                      }}
                    />
                  )}
                  <h5>{item.product.title}</h5>
                  <p>Quantity: {item.count}</p>
                  <p>Price: {item.product.price} kr</p>
                  <button
                    className="delete-btn btn-danger"
                    onClick={() => {
                      console.log("Removing from cart:", item.product.id);
                      removeFromCart(item.product.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Subtotal: {cartTotal} kr</h4>
            <button onClick={handleCheckout} className="button checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
