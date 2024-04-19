/**
 * Renders the The Blog page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The blog page component.
 */
import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="blog-card">
      <div className="blog">
        <div className="blog-images">
          <img src="images/news.webp" className="img-fluid" alt="blog" />
        </div>
        <div className="blog-content"></div>
        <p className="date">17 April, 2024</p>
        <h5 className="title">
        Amazon starts selling smart grocery carts to other retailers
        </h5>
        <p className="description">
          Amazon will begin selling its smart grocery carts to other retailers, the company said Wednesday, marking its latest bid to turn its Dash Cart technology into a service...
        </p>
        <Link className="button" hrefLang="" >Read More</Link>
      </div>
    </div>
  );
};

export default Blog;
