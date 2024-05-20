/**
 * @file Cart.js is the cart page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-item d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1694014871985"
                  alt="AirPods Pro"
                  width={300}
                  className="img-fluid"
                />
                <div className="cart-details flex-grow-1 ml-3">
                  <h5>
                    AirPods Pro (second generation) with MagSafe-chargableetui
                    (usb-c)
                  </h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="appleCare"
                    />
                    <label className="form-check-label" htmlFor="appleCare">
                      Add insurance for 395,00 kr
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="engraving"
                    />
                    <label className="form-check-label" htmlFor="engraving">
                      Add free engraving
                    </label>
                  </div>
                </div>
                <div className="cart-quantity">
                  <select
                    className="form-control w-auto"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price text-right">
                  <h5>3 301,00 kr</h5>
                  <button className="btn btn-link p-0">Remove</button>
                </div>
              </div>
              <div className="cart-summary text-right">
                <h5>Subtotal: 3 301,00 kr</h5>
                <h5>Delivery: Free</h5>
                <h3>Total amount: 3 301,00 kr</h3>
                <button className="button btn-primary" onClick={handleCheckout}>
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
