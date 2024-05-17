import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";

const Accessories = ({ grid }) => {
  let location = useLocation();

  const products = [
    {
      id: "charger",
      name: "35W USB-C Power Adapter",
      price: "350kr",
      description: "Dual-port charger for fast charging your devices.",
      rating: 4,
      imageUrl:
        "https://www.apple.com/se/shop/product/MW2K3ZM/A/35-w-usb-c-str%C3%B6madapter-med-tv%C3%A5-portar",
    },
    {
      id: "watchCable",
      name: "Magnetic Fast Charging Cable",
      price: "290kr",
      description: "USB-C connector for Apple Watch, 1m.",
      rating: 5,
      imageUrl:
        "https://www.apple.com/se/shop/product/MT0H3ZM/A/magnetisk-snabbladdningskabel-med-usb-c-kontakt-till-apple-watch-1-m",
    },
    {
      id: "proCharger",
      name: "Belkin Boost Charge Pro",
      price: "999kr",
      description: "2-in-1 wireless charging dock with MagSafe.",
      rating: 4.5,
      imageUrl:
        "https://www.apple.com/se/shop/product/HR1X2Z/A/belkin-boost%E2%86%91charge%E2%84%A2-pro-tr%C3%A5dl%C3%B6s-2-i-1-laddningsdocka-med-magsafe",
    },
    {
      id: "airPods",
      name: "AirPods Pro",
      price: "2490kr",
      description: "Active noise cancellation for immersive sound.",
      rating: 5,
      imageUrl: "https://www.apple.com/se/shop/product/MTJV3DN/A/airpods-pro",
    },
  ];

  return (
    <div className="row">
      {products.map((product) => (
        <div
          key={product.id}
          className={`${
            location.pathname === "/product" ? `gr-${grid}` : "col-md-3"
          }`}
        >
          <Link
            to={`/product/${product.id}`}
            className="accessory-card position-relative"
          >
            <div className="wishlist-icon position-absolute top-0 end-0 p-2">
              <Link to="/wishlist">
                <img src="/images/wish.svg" alt="Add to wishlist" />
              </Link>
            </div>
            <div className="image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="product-detail p-3">
              <h5 className="product-title">{product.name}</h5>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
            </div>
            <div className="action-bar position-absolute bottom-0 start-0 p-2">
              <div className="d-flex flex-row gap-2">
                <Link to={`/view/${product.id}`}>
                  <img src="/images/view.svg" alt="View" />
                </Link>
                <Link to={`/cart/add/${product.id}`}>
                  <img src="/images/add-cart.svg" alt="Add to cart" />
                </Link>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

Accessories.propTypes = {
  grid: PropTypes.string,
};

export default Accessories;
