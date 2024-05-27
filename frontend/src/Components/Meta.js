/**
 * Renders the Layout page.
 *
 * @author Hao Chen
 * @component
 * @returns {JSX.Element} The Layout component.
 */

import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

/**
 * The Meta component.
 * 
 * @param {*} props 
 * @returns 
 */
const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title} </title>
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Meta;
