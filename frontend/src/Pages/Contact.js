/**
 * The Contact component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { FaHome, FaPhoneAlt, FaMailBulk, FaInfoCircle } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Contact" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4385.735756252224!2d16.3631302!3d56.6593289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4657d163b13fc0a3%3A0xc4ce2545d5ae71e6!2sLinn%C3%A9universitetet%20Universitetskajen!5e0!3m2!1ssv!2sse!4v1713533047636!5m2!1ssv!2sse"
                width="600"
                height="450"
                className="map border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex align-items-start">
                <div className="col-lg-7 col-xl-8">
                  <h3 className="contact-title mb-4">Contact Us</h3>
                  <form
                    action=""
                    className="d-flex flex-column gap-15 align-items-start"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div>
                      <textarea
                        className="w-100 form-control"
                        id=""
                        cols="30"
                        rows="6"
                        placeholder="Other Information"
                      ></textarea>
                    </div>
                    <div>
                      <button className="button">Submit</button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5 col-xl-4">
                  <h3 className="contact-title mb-4">Responds within 1 Day</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaHome className="fs-5" />
                        <address className="inner-adress mb-0">
                          Universitetsplatsen 1 392 34, Kalmar SWEDEN
                        </address>
                      </li>
                      <li className="inner-adress mb-3 d-flex gap-15 align-items-center">
                        <FaPhoneAlt className="fs-5" />
                        <a className="mb-0" href="tel:+46 (110)-123456">
                          +46 (110)-123456
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaMailBulk className="fs-5" />
                        <a className="mb-0" href="mail">
                          bargain@lnu.se
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday || 08:00 - 16:00</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
