/**
 * @file Authentication and authorization middlewares.
 * @module middlewares/auth
 * @author Hao Chen
 * @version 1.0.0
 */

import http from "node:http";
import { JsonWebToken } from "../config/JsonWebToken.js";
import { UserModel } from "../models/UserModel.js";
import asyncHandler from "express-async-handler";


/**
 * Authenticates a request based on a JSON Web Token (JWT).
 *
 * This middleware checks the authorization header of the request, verifies the authentication scheme,
 * decodes the JWT using the provided secret key, and attaches the decoded user object to the `req.user` property.
 * If the authentication fails, an unauthorized response with a 401 Unauthorized status code is sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateJWT = asyncHandler(async (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(" ");

    // Check if the authorization header is missing or has an invalid format.
    if (authenticationScheme !== "Bearer" || !token) {
      throw new Error("Invalid authorization header, or missing token.");
    }

    // Decode the JWT and attach the user object to the request.
    req.user = await JsonWebToken.decodeUser(token, process.env.JWT_SECRET);
    console.log(req.user);

    next();
  } catch (error) {
    // Authentication failed.
    const statusCode = 401;
    const err = new Error(http.STATUS_CODES[statusCode]);
    err.status = statusCode;
    err.cause = error;

    next(err);
  }
});

/**
 * Authorizes an admin user.
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const isAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  try {
    const adminUser = await UserModel.findOne({ _id: id });
    if (!adminUser) {
      throw new Error("Unauthorized access. Admin access required.");
    } else {
      next();
    }
    console.log(adminUser);
  } catch (error) {
    // Authorization failed.
    const statusCode = 403;
    const err = new Error(http.STATUS_CODES[statusCode]);
    err.status = statusCode;
    err.cause = error;

    next(err);
  }
});
