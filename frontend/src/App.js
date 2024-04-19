import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NewArrivals from "./Pages/NewArrivals";
import Blogs from "./Pages/Blogs";
import DealsnOffers from "./Pages/DealsnOffers";
import WishList from "./Pages/WishList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="newarrivals" element={<NewArrivals />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="dealsnoffers" element={<DealsnOffers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
