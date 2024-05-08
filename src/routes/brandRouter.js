/**
 * @file Defines the brand router.
 * @module routes/brandRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from "express";
import { BrandController } from "../controllers/api/BrandController.js";
import { authenticateJWT, isAdmin } from "../middlewares/auth.js";

// Create a router.
export const router = express.Router();

// Create a new brand controller.
const controller = new BrandController();

// Map HTTP verbs and route paths to controller action methods.

// Create a new brand
router.post("/", authenticateJWT, isAdmin, (req, res, next) =>
  controller.createBrand(req, res, next)
);

// Update a brand
router.put("/:id", authenticateJWT, isAdmin, (req, res, next) =>
  controller.updateBrand(req, res, next)
);

// Delete a brand
router.delete("/:id", authenticateJWT, isAdmin, (req, res, next) =>
  controller.deleteBrand(req, res, next)
);

// Get a brand by id
router.get("/:id", (req, res, next) => controller.getBrandById(req, res, next));

// Get all categories
router.get("/", (req, res, next) => controller.getAllBrands(req, res, next));
