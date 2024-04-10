import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png';

const Navbar = () => {

  const [menu, setMenu] = useState("sell");

  return (
    <div className='navbar'>
      <div className="nav-logo-img">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("sell")}} >Sell{menu==="sell"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("products")}}>Products{menu==="products"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("categories")}}>Categories{menu==="categories"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("categories")}}>Categories{menu==="categories"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_icon} alt="" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
