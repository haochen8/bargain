/**
 * @file Defines the Category controller.
 * @module controllers/api/CategoryController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { CategoryModel } from "../../models/categoryModel.js";
import { validateMongoDbId } from "../../middlewares/validateMongoDbId.js";

/**
 * Encapsulates Category related methods and
 * handles Category related requests and responses.
 *
 * @class CategoryController
 */
export class CategoryController {
  /**
   * Create a new category.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async createCategory(req, res, next) {
    try {
      const newCategory = await CategoryModel.create(req.body);

      res.status(201).json(newCategory);
    } catch (error) {
      // Create category failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get a category.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getCategory(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const category = await CategoryModel.findById(id);
    } catch (error) {
      // Get category failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
