/**
 * @file OrderConfirmation.js is the order confirmation page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * The Order Confirmation page component.
 *
 * @returns {JSX.Element} The Order Confirmation page component.
 */
export const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <section className="order-confirmation-wrapper home-wrapper-2 py-5">
      <div className="container-xxl text-center">
        <h2>Order Successfully Placed!</h2>
        <p>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button className="button btn-primary mt-3" onClick={handleHomeNavigation}>
          Continue shopping..
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;
