/**
 * Renders the Home page.
 * @author Hao Chen
 * @returns {JSX.Element} The rendered Home component.
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Blog from "./Blog";
import ProductCard from "./ProductCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { blogData } from "../Pages/Blogs";
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product`
      );
      if (response.status === 200) {
        setFeaturedProducts(response.data);
      } else {
        console.error("Failed to fetch featured products", response);
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <Carousel
              className="carousel-wrapper"
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={3000}
              stopOnHover={true}
            >
              <div>
                <img src="images/skin-care.jpg" alt="Skincare" />
              </div>
              <div>
                <img src="images/product-banner.jpg" alt="Skincare" />
              </div>
              <div>
                <img src="images/shoes.jpg" alt="Electronic" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Products</h3>
            </div>
            <div className="row">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-3 mb-4">
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    image={
                      product.images && product.images[0]
                        ? product.images[0]
                        : "default-image-url"
                    }
                    price={product.price}
                    rating={product.rating}
                    setFlashMessage={(type, message) => {
                      setFlashMessage({ type, message });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">All order over 500kr</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Offers</h6>
                    <p className="mb-0">With Discounts</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div className="">
                    <h6>Support</h6>
                    <p className="mb-0">Contact us</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className="mb-0">Guaranteed safe payments </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <h4 className="specprod">Special Products</h4>
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Apple Watch</h6>
                    <p>10 Items</p>
                  </div>
                  <img
                    src="images/applewatch.jpg"
                    alt=""
                    className="img-fuid"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Headphones</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/beats.jpg" alt="" className="img-fuid" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Carbon Steel Pan</h6>
                    <p>10 Items</p>
                  </div>
                  <img
                    src="images/carbon-steel.jpg"
                    alt=""
                    className="img-fuid"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Kettlebell</h6>
                    <p>10 Items</p>
                  </div>
                  <img
                    src="images/kettlebell.png"
                    alt=""
                    className="img-fuid"
                  />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Espresso Machine</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/espresso.png" alt="" className="img-fuid" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Toaster</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/toaster.png" alt="" className="img-fuid" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Speaker</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="" className="img-fuid" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Sandwich grill</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/grill.jpg" alt="" className="img-fuid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex ">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/nike.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/sony.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/ikea.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/adidas.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/m-banner.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/shoe-banner.png"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/health.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute"></div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-banner position-relative p-4">
                <img
                  src="images/kitchen.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Latest News</h3>
            </div>
          </div>
          <div className="row">
            {blogData.map((blog) => (
              <div className="col-3 mb-3" key={blog.id}>
                <Blog
                  date={blog.date}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  url={blog.url}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;