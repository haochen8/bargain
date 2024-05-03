/**
 * @file Provides helper methods for working with refresh tokens.
 * @module config/refreshToken
 * @author Hao Chen
 * @version 1.0.0
 */

import jwt from "jsonwebtoken";

/**
 * Generates a new refresh token.
 */
export const generateRefreshToken = (id) => {
  const payload = {
    sub: id, // Subject (the user ID)
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}