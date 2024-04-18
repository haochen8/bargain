import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';



const BestSeller = () => {
  return (
    <div className='col-3 p-2'>
      <div className="best-seller position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
          <img src="images/wish.svg" alt="" />
          </Link>
        </div>
        <div><img src="images/watch.jpg" alt="product image" />
        </div>
        <div className="product-detail">
          <h5 className="product-title">Apple Watch </h5>
          <ReactStars
              count={5}
              size={24}
              value='4'
              edit={false}
              activeColor="#ffd700"
            />
          <p className="price">3000kr</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <Link>
            <img src="images/view.svg" alt="view" />
            </Link>
            <Link>
            <img src="images/add-cart.svg" alt="add-cart" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSeller
