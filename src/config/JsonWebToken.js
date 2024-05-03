/**
 * @file  Provides helper methods for working with JSON Web Tokens (JWTs).
 * @module lib/JsonWebTokens
 * @author Hao Chen
 * @version 1.0.0
 */

import jwt from "jsonwebtoken";

/**
 * Exposes methods for working with JSON Web Tokens (JWTs).
 */
export class JsonWebToken {
  /**
   * Decodes a JWT and returns the user object extracted from the payload.
   *
   * @param {string} token - The JWT to decode.
   * @returns {Promise<object>} A Promise that resolves to the user object extracted from the JWT payload.
   */
  static async decodeUser(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          reject(error);
          return;
        }

        // Extract the user from the decoded JWT.
        const userId = {
          id: decoded.sub,
        };

        resolve(userId);
      });
    });
  }

  /**
   * Encodes user information into a JSON Web Token (JWT) payload.
   *
   * @param {object} id - The user object containing user information to encode.
   * @param {string} secret - The secret key used for signing the JWT.
   * @param {string|number} expiresIn - The expiration time for the JWT, specified in seconds or as a string describing a time span (e.g., '1d', '2h') using the vercel/ms library.
   * @returns {Promise<string>} A Promise that resolves to the generated JWT.
   */
  static async encodeUser(id) {
    const payload = {
      sub: id, // Subject (the user ID)
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        },
        (error, token) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(token);
        }
      );
    });
  }
}
