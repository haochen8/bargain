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
   * Update a category.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(category);
    } catch (error) {
      // Update category failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Delete a category.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const category = await CategoryModel.findByIdAndDelete(id);

      res
        .status(204)
        .json(category, { message: "Category deleted successfully" });
    } catch (error) {
      // Delete category failed
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
  async getCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      validateMongoDbId(id);

      const category = await CategoryModel.findById(id);

      res.status(200).json(category);
    } catch (error) {
      // Get category failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Get all categories.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async getAllCategories(req, res, next) {
    try {
      const categories = await CategoryModel.find();

      res.status(200).json(categories);
    } catch (error) {
      // Get categories failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
