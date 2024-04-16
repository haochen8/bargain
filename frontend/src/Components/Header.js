import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'

const Header = () => {
  return (
  <>
    <header className='header-top-strip py-3'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <p className='text-white mb-0'>FREE SHIPPING spending over 500kr</p>
          </div>
          <div className="col-6">
            <p className='text-end text-white mb-0'>
              Tel:<a className='text-white' 
              href="tel: +46 (110)123456">+46 (110)-123456
            </a>
            </p>
          </div>

        </div>
      </div>

    </header>
    <header className="header-upper py-3">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-2">
            <h2>
              <Link className='text-white'>Bargain</Link>
            </h2>
          </div>
          <div className="col-5">
          <div className="input-group">
            <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2"/>
            <span className="input-group-text p-3" id="basic-addon2">
              <BsSearch className='fs-5'/>
               </span>
          </div>
          </div>
          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
              <div>
                <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='images/compare.svg' alt='contact'/>
                <p className='mb-0'>Contact <br /> 
                  </p>
                </Link> 
              </div>
                <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='images/wishlist.svg' alt='wishlist'/>
                <p className='mb-0'>Favourites <br /> My Wishlist
                  </p>
                  </Link>
              <div>
                <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='images/user.svg' alt='user'/>
                <p className='mb-0'>Login <br /> My Profile
                  </p>
                  </Link>
              </div>
              <div>
                <Link className='d-flex align-items-center gap-10 text-white'>
                <img src='images/cart.svg' alt='cart'/>
                <div className='d-flex flex-column gap-10'>
                  <span className='badge bg-white text-dark'>0</span>
                  <p className='mb-0'>500kr</p>
                </div>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <header className="header-bottom py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center">
              <div className="menu-links">
                <div className="d-flex align-items-center gap-15">
                  <NavLink>Home</NavLink>
                  <NavLink>New Arrivals</NavLink>
                  <NavLink>Deals/Offers</NavLink>
                  <NavLink>FAQ</NavLink>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
  );
}

export default Header
