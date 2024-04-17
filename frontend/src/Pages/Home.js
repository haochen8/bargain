import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import Blog from '../Components/Blog';


const Home = () => {
  return (
    <>
    <section className="home-wrapper-1 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img src="images/m-banner.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="small-banner-content position-absolute">
              </div>
            </div>
          </div>
          <div className="col-6">
              <div className="main-banner position-relative">
              <img src="images/shoe-banner.png" className='img-fluid rounded-3' alt="main banner" />
            </div>
          </div>
          <div className="col-6">
              <div className="main-banner position-relative">
              <img src="images/health.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="small-banner-content position-absolute">
              </div>
            </div>
          </div>
          <div className="col-6">
              <div className="main-banner position-relative p-4">
              <img src="images/kitchen.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="small-banner-content position-absolute">
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    <section className='home-wrapper-2 py-5'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              <div className='d-flex align-items-center gap-15'>
                <img src="images/service.png" alt="services" />
              <div>
              <h6>Free Shipping</h6>
              <p className='mb-0'>All order over 500kr</p>
              </div>
              </div>
              <div className='d-flex align-items-center gap-15'>
                <img src="images/service-02.png" alt="services" />
              <div>
              <h6>Daily Offers</h6>
              <p className='mb-0'>With Discounts</p>
              </div>
              </div>
              <div className='d-flex align-items-center gap-15'>
                <img src="images/service-03.png" alt="services" />
              <div className=''>
              <h6>Support</h6>
              <p className='mb-0'>Contact us</p>
              </div>
              </div>
              <div className='d-flex align-items-center gap-15'>
                <img src="images/service-05.png" alt="services" />
              <div>
              <h6>Secure Payment</h6>
              <p className='mb-0'>Guaranteed safe payments </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between align-items-center flex-wrap">
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Apple Watch</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/applewatch.jpg" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/beats.jpg" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Carbon Steel Pan</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/carbon-steel.jpg" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Kettlebell</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/kettlebell.png" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Espresso Machine</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/espresso.png" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Toaster</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/toaster.png" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Speaker</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/speaker.jpg" alt="" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>Sandwich grill</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/grill.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="marquee-wrapper py-5">
      <div className="row">
        <div className="col-12">
      <div className='marquee-inner-wrapper card-wrapper'>
      <Marquee className='d-flex '>
        <div className='mx-4 w-25'><img src="images/brand-01.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-02.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-03.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-04.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-05.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-06.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-07.png" alt="brand" /></div>
        <div className='mx-4 w-25'><img src="images/brand-08.png" alt="brand" /></div>
      </Marquee>
      </div>
      </div>
      </div>
    </section>
    <section className="blog-wrapper py-5 home-wrapper">
      <div className="container-xxl">
        <div className="row">
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </div>
    </section>
    </>
  )
}

export default Home