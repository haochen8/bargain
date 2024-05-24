/**
 * This is the main entry point of the frontend application. It wraps the App component with the necessary providers and renders it to the DOM.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.js";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./Context/CartContext.js";
import "./index.css";
import App from "./App";

/**
 * Renders the application to the DOM.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
