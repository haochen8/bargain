/**
 * Renders the Layout page.
 *
 * @author Hao Chen 
 * @component
 * @returns {JSX.Element} The Layout component.
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * The Layout component.
 * 
 * @returns {JSX.Element} The Layout component.
 */
const Layout = () => {
  return (
    <>
          <Header />
          <Outlet />
          <Footer />
    </>
  )
}

export default Layout
