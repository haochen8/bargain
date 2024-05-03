/**
 * @file Defines the userController
 * @module controllers/userController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { logger } from "../../config/winston.js";
import { UserModel } from "../../models/UserModel.js";
import { JsonWebToken } from "../../config/JsonWebToken.js";
import { validateMongoDbId } from "../../middlewares/validateMongoDbId.js";

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

      // Generate an access token.
      const accessToken = await JsonWebToken.encodeUser(user._id);

      logger.silly("Autehnticated user.", { user: user });

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
      // Get user by id failed.
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
}
