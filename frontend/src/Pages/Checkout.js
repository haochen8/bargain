/**
 * @file Checkout page component.
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


/**
 * The Checkout page component.
 * 
 * @returns {JSX.Element} The Checkout page component.
 */
const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();

  /**
   * Handles the form change event.
   * @param {*} e 
   */
  const handleChange = (e) => {
    const { id, name, value, type } = e.target;
    if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  /**
   * Handles the form submit event.
   * 
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data, create an order
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/cart/create-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/order-confirmation");
      }
    } catch (error) {
      console.error("Invalid information provided, please try again", error);
    }
  };

  return (
    <section className="checkout-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Credit card"
                    checked={formData.paymentMethod === "Credit card"}
                    onChange={handleChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Debit card"
                    checked={formData.paymentMethod === "Debit card"}
                    onChange={handleChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="PayPal"
                    checked={formData.paymentMethod === "PayPal"}
                    onChange={handleChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="ccName">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccName"
                    value={formData.ccName}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="ccNumber">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccNumber"
                    value={formData.ccNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="ccExpiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccExpiration"
                    value={formData.ccExpiration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="ccCvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccCvv"
                    value={formData.ccCvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <hr className="mb-4" />
              <div className="purchase-btn">
                <button className="button btn-primary btn-lg" type="submit">
                  Complete Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
