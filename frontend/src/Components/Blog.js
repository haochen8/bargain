/**
 * Renders the The Blog page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The blog page component.
 */
import React from "react";
import PropTypes from "prop-types";

const Blog = ({ date, title, description, image, url }) => {
  const handleCardClick = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };
  return (
    <div
      className="blog-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="blog">
        <div className="blog-images">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} className="img-fluid" alt="blog" />
          </a>
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{title}</h5>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Blog;
