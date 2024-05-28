/**
 * This file provides the CartContext and CartProvider components.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CartContext = createContext();

/**
 * Provides cart context to its children.
 *
 * @param {*} param0 The children components.
 * @returns {JSX.Element} The rendered application.
 */
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

/**
 * Provides cart context to its children.
 *
 * @param {*} param0
 * @returns {JSX.Element} The rendered application.
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  useEffect(() => {
    loadCart();
  }, []);

  /**
   * Loads the cart from the backend.
   * @returns {Promise<void>}
   * @throws {Error} If the user is not logged in.
   * @throws {Error} If the cart fails to load.
   */
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "SET_CART", payload: response.data.products || [] });
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  /**
   * Adds a product to the cart.
   *
   * @param {*} productId
   */
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user is not logged in.");
        throw new Error("User not logged in");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/cart`,
        {
          cart: [product],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "ADD_TO_CART", payload: response.data.products });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  /**
   * Removes a product from the cart.
   */
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
      setFlashMessage("error", "Product removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  /**
   * Clears the cart.
   */
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export default CartContext;
