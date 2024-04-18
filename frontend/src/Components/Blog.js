/**
 * Renders the The Blog page.
 *
 * @author Hao Chen 
 * @component
 * @returns {JSX.Element} The blog page component.
 */
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  return (
    <div className='col-3'>
      <div className="blog">
        <div className="blog-images">
          <img src="images/blog-1.jpg" className='img-fluid' alt="blog" />
        </div>
        <div className="blog-content"></div>
          <p className='date'>18 April, 2024</p>
          <h5 className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
          <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, quas maxime est beatae, quis minima minus amet, odit consectetur dolorem explicabo laborum ipsam nemo dignissimos. Tempore quia facere quibusdam iusto!</p>
          <Link className='button'>Read More</Link>
      </div>
    </div>
  )
}

export default Blog
