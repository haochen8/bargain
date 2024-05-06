/**
 * @file Defines the Product controller.
 * @module controllers/api/ProductController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { ProductModel } from "../../models/productModel.js";
import slugify from "slugify";

/**
 * Encapsulates Product related methods and
 * handles Product related requests and responses.
 *
 * @class ProductController
 */
export class ProductController {
  /**
   * Create a new product.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async createProduct(req, res, next) {
    try {
      // Generate slug from title
      if (!req.body.slug && req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const newProduct = await ProductModel.create(req.body);

      res.status(201).json(newProduct);
    } catch (error) {
      // Create product failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Update a product.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;

      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const updatedProduct = await ProductModel.findOneAndUpdate(
        {
          id: id,
        },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json(updatedProduct);
    } catch {
      // Update product failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Delete a product.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;

      const deletedProduct = await ProductModel.findOneAndDelete({
        id: id,
      });

      res.status(200).json(deletedProduct);
    } catch (error) {
      // Delete product failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get a product.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getProduct(req, res, next) {
    try {
      // Get product by id
      const id = req.params.id;

      // Find product by id
      const findProduct = await ProductModel.findById(id);

      // Send response
      res.status(200).json(findProduct);
    } catch (error) {
      // Get product failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get all products.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getAllProducts(req, res, next) {
    try {
      // Find all products
      const getAllProducts = await ProductModel.find();

      // Send response
      res.status(200).json(getAllProducts);
    } catch (error) {
      // Get products failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
