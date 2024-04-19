/**
 * The Blogs component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "./Meta";
import Blog from "../Components/Blog";

const Blogs = () => {
  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Electronics</li>
                    <li>Fashion</li>
                    <li>Home Products</li>
                    <li>Skin Care</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-6 mb-3">
                  <Blog />
                </div>
                <div className="col-6 mb-3">
                  <Blog />
                </div>
                <div className="col-6 mb-3">
                  <Blog />
                </div>
                <div className="col-6 mb-3">
                  <Blog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
