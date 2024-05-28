/**
 * @file Cart.js is the cart page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart, loadCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);


  useEffect(() => {
    const fetchCartData = async () => {
      await loadCart();
      setIsLoading(false);
    };
    fetchCartData();
  }, []); // Run only once when the component mounts


  /**
   * Handles the checkout process.
   */
  const handleCheckout = async () => {
    navigate("/checkout");
  };

  // If the cart is still loading, display a loading message
  if (isLoading) {
    return (
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl py-5">
          <div className="col-12">
            <h3 className="section-heading">Loading your cart...</h3>
          </div>
        </div>
      </section>
    );
  }

  // If the cart is empty, display a message
  if (!cart || cart.length === 0) {
    return (
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl py-5">
          <div className="col-12">
            <h3 className="section-heading">Your Cart is empty</h3>
          </div>
        </div>
      </section>
    );
  }

  // Calculate the total price of the cart
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.count,
    0
  );

  // Truncate long product titles
  const truncateTitle = (title, maxLength = 20) => {
    if (!title) {
      return "";
    }
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="col-12">
            <h3 className="section-heading">Your Cart</h3>
          </div>
          <div className="row">
            {cart.map((item) => (
              <div key={item.product.id} className="col-3 mb-4 product-cart">
                <div className="text-center">
                  {item.product.images && item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="img-fluid mb-2"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#eaeaea",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h5 className="product-title">
                    {truncateTitle(item.product.title)}
                  </h5>
                  <p>Quantity: {item.count}</p>
                  <p>Price: {item.product.price} kr</p>
                  <button
                    className="delete-btn btn-danger"
                    onClick={() => {
                      removeFromCart(item.product.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-5">
          <h4 className="main-product-details mb-0">
            Subtotal: {cartTotal} kr
          </h4>
          <button onClick={handleCheckout} className="button btn-primary me-5">
            Proceed to Checkout
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
