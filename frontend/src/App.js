/**
 * Main application component.
 *
 * @author: Hao Chen
 * @version: 1.0
 * @returns {JSX.Element} The rendered application.
 */

import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NewArrivals from "./Components/NewArrivals";
import Blogs from "./Pages/Blogs";
import WishList from "./Pages/WishList";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Forgotpassword from "./Pages/Forgotpassword";
import Resetpassword from "./Pages/Resetpassword";
import Policys from "./Pages/Policys";
import TermsnConditions from "./Pages/TermsnConditions";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Healthnfitness from "./Components/Healthnfitness";
import Electronics from "./Components/Electronics";
import Skincare from "./Components/Skincare";
import AddProduct from "./Components/AddProduct";
import SingleProduct from "./Components/SingleProduct";
import Fashion from "./Components/Fashion";
import Kitchen from "./Components/Kitchen";
import HomeProducts from "./Components/HomeProducts";
import SearchResults from "./Components/SearchResults";
import OrderConfirmation from "./Pages/OrderConfirmation";
import ScrollToTop from "./Components/ScrollToTop";
import PrivateRoute from "./Components/PrivateRoute";

/**
 * Main application component.
 *
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  const [products, setProducts] = useState([]);

  /**
   * Adds a new product to the list of products.
   */
  const handleAddedProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="newarrivals"
            element={<NewArrivals products={products} />}
          />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route
            path="add-product"
            element={
              <PrivateRoute
                component={AddProduct}
                fallback="/login"
                onProductAdded={handleAddedProduct}
              />
            }
          />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="resetpassword" element={<Resetpassword />} />
          <Route path="policys" element={<Policys />} />
          <Route path="termsnconditions" element={<TermsnConditions />} />
          <Route path="singleproduct" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="skincare" element={<Skincare />} />
          <Route path="healthnfitness" element={<Healthnfitness />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="home-products" element={<HomeProducts />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
