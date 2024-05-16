import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";

const AboutUs = () => {
  return (
    <>
      <Meta title="About Us" />
      <BreadCrumb title="About Us" />
      <section className="about-us-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <h2>About Us</h2>
                <p>
                  Welcome to Bargain, your number one source for all things
                  fashion, electronics, kitchen, and health &amp; fitness
                  products. We are dedicated to providing you the very best of
                  products, with an emphasis on quality, customer service, and
                  uniqueness.
                </p>

                <h3>Our Story</h3>
                <p>
                  Founded in 2024, Bargain has come a long way from its
                  beginnings in Kalmar. When we first started out, our passion
                  for affordable, high-quality products drove us to start our
                  own business.
                </p>

                <h3>Our Mission</h3>
                <p>
                  Our mission is to offer unbeatable prices on a wide variety of
                  products while ensuring top-notch customer service. We strive
                  to make online shopping a seamless and enjoyable experience
                  for our customers.
                </p>

                <h3>Our Products</h3>
                <p>
                  At Bargain, we offer a diverse range of products across four
                  main categories:
                </p>
                <ul>
                  <li>
                    <strong>Fashion:</strong> Trendy and affordable clothing,
                    accessories, and footwear for men, women, and children.
                  </li>
                  <li>
                    <strong>Electronics:</strong> Latest gadgets, smartphones,
                    laptops, and accessories to keep you connected and
                    entertained.
                  </li>
                  <li>
                    <strong>Kitchen:</strong> High-quality kitchen appliances,
                    utensils, and gadgets to make your cooking experience
                    enjoyable and efficient.
                  </li>
                  <li>
                    <strong>Health &amp; Fitness:</strong> Equipment, apparel,
                    and accessories to help you stay fit and healthy.
                  </li>
                </ul>

                <h3>Why Choose Us?</h3>
                <p>
                  We believe in putting our customers first and work tirelessly
                  to meet and exceed their expectations. Here are a few reasons
                  why you should choose Bargain:
                </p>
                <ul>
                  <li>Wide selection of high-quality products</li>
                  <li>Competitive pricing</li>
                  <li>Exceptional customer service</li>
                  <li>Fast and reliable shipping</li>
                  <li>Easy returns and refunds</li>
                </ul>

                <h3>Get in Touch</h3>
                <p>
                  We love to hear from our customers! If you have any questions
                  or feedback, please don’t hesitate to contact us at +46
                  (110)-123456. Follow us on our social media
                  channels to stay updated on the latest products and
                  promotions.
                </p>
                <p>
                  Thank you for choosing Bargain. We hope you enjoy our products
                  as much as we enjoy offering them to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
