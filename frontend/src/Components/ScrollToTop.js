/**
 * @file ScrollToTop.js is a component that scrolls to the top of the page when the user navigates to a new page.
 * @author Hao Chen
 * @returns {JSX.Element} The ScrollToTop component.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
