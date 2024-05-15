/**
 * Main application component.
 *
 * @author: Hao Chen
 * @version: 1.0
 * @returns {JSX.Element} The rendered application.
 */

import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NewArrivals from "./Pages/NewArrivals";
import Blogs from "./Pages/Blogs";
import DealsnOffers from "./Pages/DealsnOffers";
import WishList from "./Pages/WishList";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Forgotpassword from "./Pages/Forgotpassword";
import Resetpassword from "./Pages/Resetpassword";
import Policys from "./Pages/Policys";
import TermsnConditions from "./Pages/TermsnConditions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="newarrivals" element={<NewArrivals />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="dealsnoffers" element={<DealsnOffers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="resetpassword" element={<Resetpassword />} />
          <Route path="policys" element={<Policys />} />
          <Route path="termsnconditions" element={<TermsnConditions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
