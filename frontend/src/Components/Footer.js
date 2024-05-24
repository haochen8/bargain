/**
 * Footer component.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";



const Footer = () => {
  return (
    <>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row align-items-center">


          </div>
        </div>
    </footer>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-4">
            <h4 className='text-white mb-4'>Contact Us</h4>
            <div>
              <address className='text-white fs-6'>
                Universitetsplatsen 1 <br />
                392 34, Kalmar <br />
                SWEDEN
              </address>
              <a href="tel: +46 (110)123456" className='mt-4 d-block mb-1 text-white'>+46 (110)-123456</a>
              <a href="mail: bargain@lnu.se" className='mt-2 d-block mb-3 text-white'>bargain@lnu.se</a>
              <div className="social_icons d-flex align-ietms-center gap-30 mt-4">
                <a className='text-white' href="#">
                  <FaFacebook className='fs-4'/>
                  </a>
                <a className='text-white' href="#">
                  <FaInstagramSquare className='fs-4'/>
                </a>
                <a className='text-white' href="#">
                  <FaLinkedin className='fs-4'/>
                 </a>
                <a className='text-white' href="#">
                  <FaSquareXTwitter className='fs-4'/>
                 </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h4 className='text-white mb-4'>Information</h4>
            <div className='footer-link d-flex flex-column'>
              <Link to='/policys' className='text-white py-2 mb-1'>Policys</Link>
              <Link className='text-white py-2 mb-1'></Link>
            </div>
          </div>
          <div className="col-2">
            <h4 className='text-white mb-4'>Account</h4>
            <div className='footer-link d-flex flex-column'>
              <Link to='/about' className='text-white py-2 mb-1'>About Us</Link>
              <Link className='text-white py-2 mb-1'></Link>
              <Link className='text-white py-2 mb-1'></Link>
            </div>
          </div>
          <div className="col-1">
            <h4 className='text-white mb-4'>FAQ</h4>
            <div className='footer-link d-flex flex-column'>
              <Link to='/termsnconditions' className='text-white py-2 mb-1'>Terms of Services</Link>
              <Link className='text-white py-2 mb-1'></Link>
              <Link className='text-white py-2 mb-1'></Link>
              <Link className='text-white py-2 mb-1'></Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
    <footer className='py-4'>
        <div className="col-7"></div>
        <div className="col-12">
        <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}, Bargain Inc.</p>
        </div>
    </footer>
    </>
  )
}

export default Footer
