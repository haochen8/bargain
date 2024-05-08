/**
 * @file Defines the Product controller.
 * @module controllers/api/ProductController
 * @author Hao Chen
 * @version 3.1.0
 */

import http from "node:http";
import { ProductModel } from "../../models/productModel.js";
import slugify from "slugify";
import { validateMongoDbId } from "../../middlewares/validateMongoDbId.js";
import { UserModel } from "../../models/UserModel.js";
import mongoose, { mongo } from "mongoose";

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
      console.log("updateProduct called with ID:", req.params.id); // Log the ID being passed

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
    } catch (error) {
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
      validateMongoDbId(id);

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
      // Extract query parameters
      const {
        maxPrice,
        minPrice,
        category,
        brand,
        color,
        sort,
        fields,
        page,
        limit,
        ...rest
      } = req.query;

      let query = { ...rest };

      // Convert query object to string
      let queryStr = JSON.stringify(query);
      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
      query = JSON.parse(queryStr);

      // Apply filters
      if (maxPrice || minPrice) {
        query.price = {};
        if (maxPrice) {
          query.price.$lte = maxPrice;
        }
        if (minPrice) {
          query.price.$gte = minPrice;
        }
      }
      if (category) {
        query.category = category;
      }
      if (brand) {
        query.brand = brand;
      }
      if (color) {
        query.color = color;
      }

      // Prepare query
      let queryProducts = ProductModel.find(query);

      // Apply sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryProducts = queryProducts.sort(sortBy);
      }

      // Apply field limiting
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryProducts = queryProducts.select(fields);
      }

      // Apply pagination
      const resultsPerPage = parseInt(limit, 10) || 100;
      const currentPage = parseInt(page, 10) || 1;
      const skip = (currentPage - 1) * resultsPerPage;
      queryProducts = queryProducts.skip(skip).limit(resultsPerPage);

      // Execute query
      const products = await queryProducts;

      // Send response
      res.status(200).json(products);
    } catch (error) {
      // Get products failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Add to wishlist.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async addToWishList(req, res, next) {
    try {
      // Get user id and product id
      const userId = req.user.id;
      const productId = req.body.productId;

      // Check if user exists
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if product exists
      const isProductInWishList = user.wishlist.includes(productId);

      // Remove product from wishlist
      if (isProductInWishList) {
        await UserModel.findByIdAndUpdate(userId, {
          $pull: { wishlist: productId },
        });
        return res
          .status(200)
          .json({ message: "Product removed from wishlist" });
      } else {
        // Add product to wishlist
        await UserModel.findByIdAndUpdate(userId, {
          $push: { wishlist: productId },
        });
        return res.status(200).json({ message: "Product added to wishlist" });
      }
    } catch (error) {
      // Add to wishlist failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }

  /**
   * Rate a product.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async rateProduct(req, res, next) {
    try {
      // Get user id and product id
      const userId = req.user.id;
      const { star, productId } = req.body;

      if (star < 1 || star > 5) {
        return res
          .status(400)
          .json({ message: "Star rating must be between 1 and 5" });
      }

      // Retrieve product by id
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if user already rated the product
      let existingRating = product.ratings.find(
        (rating) => rating.postedBy.toString() === userId.toString()
      );
      // Update rating
      if (existingRating) {
        existingRating.star = star;
      } else {
        // Add new rating
        product.ratings.push({ star, postedBy: userId });
      }

      const updatedProduct = await product.save();

      if (updatedProduct) {
        return res.status(200).json({ message: "Rating successfully added" });
      } else {
        return res.status(400).json({ message: "Rating failed to rate" });
      }
    } catch (error) {
      // Rate product failed
      const httpStatusCode = 400;
      const err = new Error(http.STATUS_CODES[httpStatusCode]);
      err.status = httpStatusCode;
      err.cause = error;

      next(err);
    }
  }
}
