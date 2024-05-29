/**
 * @file Policies.js is the policies page for the webshop
 *
 * @author Hao Chen
 * @version: 1.0
 */

import React from "react";

/**
 * The Policies page component.
 * 
 * @returns {JSX.Element} The Policies page component.
 */
const Policies = () => {
  return (
    <>
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <h2>Policies</h2>

                <h3>Privacy Policy</h3>
                <p>
                  Your privacy is important to us. This privacy policy explains
                  how we collect, use, and protect your personal information
                  when you use our services.
                </p>
                <p>
                  1.1. We collect information that you provide directly to us
                  when you create an account, place an order, or contact us for
                  support.
                  <br />
                  1.2. We use this information to process your orders, provide
                  customer service, and improve our services.
                  <br />
                  1.3. We do not share your personal information with third
                  parties except as necessary to provide our services or as
                  required by law.
                </p>

                <h3>Return Policy</h3>
                <p>
                  We want you to be completely satisfied with your purchase. If
                  you are not satisfied, you can return your items within
                  14 days of delivery for a full refund.
                </p>
                <p>
                  2.1. Returned items must be in their original condition and
                  packaging.
                  <br />
                  2.2. To initiate a return, please contact our customer service
                  team.
                  <br />
                  2.3. Refunds will be processed within 7 days of
                  receiving the returned items.
                </p>

                <h3>Shipping Policy</h3>
                <p>
                  We strive to deliver your orders promptly and efficiently.
                </p>
                <p>
                  3.1. We offer multiple shipping options to meet your needs.
                  <br />
                  3.2. Shipping times are estimates and may vary based on your
                  location and the shipping method selected.
                  <br />
                  3.3. We are not responsible for delays caused by shipping
                  carriers or events outside of our control.
                </p>

                <h3>Terms of Service</h3>
                <p>By using our services, you agree to our terms of service.</p>
                <p>
                  4.1. You must create an account to use certain features of our
                  services.
                  <br />
                  4.2. You are responsible for maintaining the confidentiality
                  of your account information.
                  <br />
                  4.3. You agree not to use our services for any unlawful or
                  prohibited activities.
                </p>

                <h3>Cookie Policy</h3>
                <p>We use cookies to enhance your experience on our website.</p>
                <p>
                  5.1. Cookies are small data files that are stored on your
                  device when you visit our website.
                  <br />
                  5.2. We use cookies to remember your preferences and to
                  understand how you use our website.
                  <br />
                  5.3. You can manage your cookie settings through your browser.
                </p>

                <h3>Security Policy</h3>
                <p>
                  We take the security of your personal information seriously.
                </p>
                <p>
                  6.1. We use industry-standard security measures to protect
                  your data.
                  <br />
                  6.2. However, no method of transmission over the Internet or
                  electronic storage is completely secure.
                  <br />
                  6.3. We cannot guarantee the absolute security of your
                  information.
                </p>

                <h3>Contact Us</h3>
                <p>
                  If you have any questions about our policies, please contact
                  us at bargain@lnu.se.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Policies;
