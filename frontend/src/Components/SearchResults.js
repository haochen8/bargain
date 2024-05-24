/**
 * @file SearchResults.js is the component for displaying search results.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The SearchResults component.
 * @version 3.1.0
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

/**
 * The SearchResults component.
 *
 * @returns {JSX.Element} The rendered SearchResults component.
 */
const SearchResults = () => {

  // State variables
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  /**
   * Fetches the search results.
   *
   * @param {string} searchTerm - The search term.
   */
  const fetchSearchResults = async (searchTerm) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/search?query=${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="search-page container-xxl py-5">
      <div className="row">
        <div className="col-12">
          <h3 className="section-heading">Search Results for {query} </h3>
        </div>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
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
                />
              </div>
            ))
          ) : (
            <p>No products found for the search result, try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
