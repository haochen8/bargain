/**
 * @file Defines the Product controller.
 * @module controllers/api/ProductController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from 'node:http'
import { ProductModel } from '../../models/productModel.js'

/**
 * Encapsulates Product related methods and
 * handles Product related requests and responses.
 * @class
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
      const newProduct = await ProductModel.create(req.body)
      await newProduct.save()
      res.status(201).json(newProduct)
    } catch (error) {
      // Create product failed
      const httpStatusCode = 400
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err)
    }
  }
}




