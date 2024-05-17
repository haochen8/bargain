import React from "react";

const Checkout = () => {
  return (
    <section className="checkout-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Checkout</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
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
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
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
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
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
                    required
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    required
                  />
                </div>
              </div>
              <hr className="mb-4" />
              <div className="purchase-btn">
                <button className="button btn-primary btn-lg" type="submit">Complete Purchase</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
