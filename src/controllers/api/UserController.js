/**
 * @file Defines the user controller.
 * @module controllers/api/UserController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { logger } from "../../config/winston.js";
import { UserModel } from "../../models/UserModel.js";
import { JsonWebToken } from "../../config/JsonWebToken.js";
import { validateMongoDbId } from "../../middlewares/validateMongoDbId.js";
import { generateRefreshToken } from "../../config/refreshToken.js";
import jwt from "jsonwebtoken";
import { CartModel } from "../../models/cartModel.js";
import { ProductModel } from "../../models/productModel.js";
import path from "node:path";
import { OrderModel } from "../../models/orderModel.js";

/**
 * Encapsulates the user controller.
 */
export class UserController {
  /**
   * Registers a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async register(req, res, next) {
    try {
      logger.silly("Creating user...", { body: req.body });

      // Get the username and password from the request body.
      const { firstName, lastName, email, username, password } = req.body;

      // Check if the username or email already exists.
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username or email already exists.",
        });
      }

      // Create a new user.
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        username,
        password,
      });

      logger.silly("Created new user.", { user: newUser });

      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        message: "User created successfully.",
      });
    } catch (error) {
      // Registration failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Logs in a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async login(req, res, next) {
    try {
      logger.silly("Logging in user...", { body: req.body });

      // Get the username from the request body.
      const { username } = req.body;

      // Check if user exists
      const userExists = await UserModel.exists({ username });
      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: "User does not exist.",
        });
      }

      // Authenticate the user.
      const user = await UserModel.authenticate(
        req.body.username,
        req.body.password
      );

      // Generate an JWT access token.
      const accessToken = await JsonWebToken.encodeUser(user._id);

      // Generate a refresh token.
      const refreshToken = generateRefreshToken();
      await UserModel.findByIdAndUpdate(
        user._id,
        { refreshToken: refreshToken },
        { new: true }
      );

      // Store the refresh token with expiry.
      user.refreshTokens.push({
        token: refreshToken,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        path: "/",
      });

      logger.silly("Authenticated user.", { user: user });

      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        access_token: accessToken,
      });
    } catch (error) {
      // Authentication failed.
      const httpStatusCode = 401;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Handles the Refresh token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async handleRefreshToken(req, res, next) {
    try {
      // Get the refresh token from the request cookies.
      const cookie = req.cookies;
      const refreshToken = cookie.refreshToken;

      // Check if the refresh token exists in the cookie.
      if (!cookie?.refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token not found in Cookies.",
        });
      }

      // Check if the refresh token exists in the database.
      const user = await UserModel.findOne({ refreshToken });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid refresh token.",
        });
      }

      // Verify the refresh token.
      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid refresh token.",
          });
        }
      });

      // Generate a new JWT access token.
      const accessToken = await JsonWebToken.encodeUser(user._id);

      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        access_token: accessToken,
      });
    } catch (error) {
      // Refresh token failed.
      const httpStatusCode = 401;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Logs out a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async logout(req, res, next) {
    try {
      logger.silly("Logging out user...");

      // Get the refresh token from the request cookies.
      const { refreshToken } = req.cookies;

      // Check if the refresh token exists in the cookie.
      if (!refreshToken) {
        logger.warn("Refresh token not found in Cookies.");
        return res.status(400).json({
          success: false,
          message: "Refresh token not found in Cookies.",
        });
      }

      // Check if the refresh token exists in the database.
      const user = await UserModel.findOne({
        "refreshTokens.token": refreshToken,
      });
      if (!user) {
        logger.warn("Invalid refresh token.");
        return res.status(400).json({
          success: false,
          message: "Invalid refresh token.",
        });
      }

      // Remove the refresh token from the user.
      user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
      await user.save();

      // Clear the refresh token cookie.
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });

      logger.silly("Logged out user.", { user: user });

      res.status(200).json({
        message: "User logged out successfully.",
      });
    } catch (error) {
      // Logout failed.
      const httpStatusCode = 401;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;
      logger.error("Logout failed:", error);
      next(err);
    }
  }

  /**
   * Get all users.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async getAllUsers(req, res, next) {
    try {
      logger.silly("Getting all users...");

      // Get all users.
      const getUsers = await UserModel.find();

      logger.silly("Got all users.", { users: getUsers });

      res.status(200).json(getUsers);
    } catch (error) {
      // Get all users failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get user by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async getUserById(req, res, next) {
    try {
      logger.silly("Getting user by id...", { id: req.params.id });

      // Get id from request params.
      const id = req.params.id;
      validateMongoDbId(id);

      // Get user by id.
      const getUser = await UserModel.findById(id);

      logger.silly("Got user by id.", { user: getUser });

      res.status(200).json(getUser);
    } catch (error) {
      // Get user by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Delete user by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async deleteUser(req, res, next) {
    try {
      logger.silly("Getting user by id...", { id: req.params.id });

      // Get id from request params.
      const id = req.params.id;
      validateMongoDbId(id);

      // Get user by id.
      const delUser = await UserModel.findByIdAndDelete(id);

      logger.silly("Got user by id.", { user: delUser });

      res.status(200).json(delUser);
    } catch (error) {
      // Delete user by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Update user by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async updateUser(req, res, next) {
    try {
      // Get the id
      const id = req.user.id;
      validateMongoDbId(id);

      logger.silly("Updating user by id...", { id: id });

      // Get user by id.
      const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updateUser) {
        throw new Error("User not found or update failed");
      }

      logger.silly("Updated user by id.", { user: updateUser });

      res.status(200).json(updateUser);
    } catch (error) {
      // Get user by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get wishlist by user id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async getWishList(req, res, next) {
    try {
      // Get the id
      const userId = req.user.id;
      validateMongoDbId(userId);

      // Get user by id.
      const user = await UserModel.findById(userId).populate("wishlist");

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get full product details from wishlist
      const wishlist = await ProductModel.find({ _id: { $in: user.wishlist } });

      res.status(200).json(wishlist);
    } catch (error) {
      // Get user by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Add to cart by user id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async userCart(req, res, next) {
    try {
      const cart = req.body.cart;
      const userId = req.user.id;
      validateMongoDbId(userId);

      // Check product exists in cart
      let isProductInCart = await CartModel.findOne({ orderedBy: userId });

      if (!isProductInCart) {
        isProductInCart = new CartModel({ orderedBy: userId });
      } else {
        isProductInCart.products = [];
      }

      let cartTotal = 0;
      for (let i = 0; i < cart.length; i++) {
        let object = {
          product: cart[i]._id,
          count: parseInt(cart[i].count),
          color: cart[i].color,
        };
        let getPrice = await ProductModel.findById(cart[i]._id)
          .select("price")
          .exec();
        object.price = getPrice.price;
        cartTotal += getPrice.price * object.count;
        isProductInCart.products.push(object);
      }

      // Update and save cart
      isProductInCart.cartTotal = cartTotal;
      await isProductInCart.save();

      res.status(200).json(isProductInCart);
    } catch (error) {
      // Add to cart by user id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get cart by user id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async getCart(req, res, next) {
    try {
      const userId = req.user.id;
      validateMongoDbId(userId);

      // Find cart by user id
      const userCart = await CartModel.findOne({ orderedBy: userId }).populate(
        "products.product",
        "_id name price"
      );

      res.status(200).json(userCart);
    } catch (error) {
      // Get cart by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Delete cart by user id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async deleteCart(req, res, next) {
    try {
      const userId = req.user.id;
      validateMongoDbId(userId);

      const user = await UserModel.findById(userId);

      // Find cart by user id
      const userCart = await CartModel.findOneAndDelete({ orderedBy: userId });

      res.status(200).json(userCart);
    } catch (error) {
      // Delete cart by id failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Create order by user id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      validateMongoDbId(userId);

      // Find cart by user id
      const userCart = await CartModel.findOne({ orderedBy: userId }).populate(
        "products.product",
        "_id name price"
      );

      // Check if cart exists
      if (!userCart) {
        return res.status(400).json({
          success: false,
          message: "No cart found.",
        });
      }

      // Create a new order
      const newOrder = new OrderModel({
        products: userCart.products,
        paymentIntent: {
          id: "12345",
          amount: userCart.cartTotal,
          currency: "kr",
          status: "Pending",
        },
        orderedBy: userId,
      });

      // Save the order to the database
      await newOrder.save();

      // Clear the cart
      await CartModel.findOneAndDelete({ orderedBy: userId });

      res.status(200).json({
        success: true,
        message: "Order created successfully.",
        order: newOrder,
      });
    } catch (error) {
      // Create order failed.
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get authenticated user details.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async getMe(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      const httpStatusCode = 500;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
