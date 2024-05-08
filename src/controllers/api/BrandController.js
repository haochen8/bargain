/**
 * @file Defines the Brand controller.
 * @module controllers/api/BrandController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { BrandModel } from "../../models/brandModel.js";
import { validateMongoDbId } from "../../middlewares/validateMongoDbId.js";

/**
 * Encapsulates Brand related methods and
 * handles Brand related requests and responses.
 *
 * @class BrandController
 */
export class BrandController {
  /**
   * Create a new brand.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async createBrand(req, res, next) {
    try {
      const newBrand = await BrandModel.create(req.body);

      res.status(201).json(newBrand);
    } catch (error) {
      // Create brand failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Update a brand.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async updateBrand(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const brand = await BrandModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(brand);
    } catch (error) {
      // Update brand failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Delete a brand.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async deleteBrand(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const brand = await BrandModel.findByIdAndDelete(id);

      res.status(204).json(brand);
    } catch (error) {
      // Delete brand failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get a brand.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getBrandById(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const brand = await BrandModel.findById(id);

      res.status(200).json(brand);
    } catch (error) {
      // Get brand failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get all brand.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getAllBrands(req, res, next) {
    try {
      const brands = await BrandModel.find();

      res.status(200).json(brands);
    } catch (error) {
      // Get brands failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
