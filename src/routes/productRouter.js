/**
 * @file Defines the product router.
 * @module routes/productRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { ProductController } from '../controllers/api/ProductController.js'
import { authenticateJWT, isAdmin } from '../middlewares/auth.js'

// Create a router.
export const router = express.Router()

// Create a new product controller.
const controller = new ProductController()

// Map HTTP verbs and route paths to controller action methods.

// Create a new product
router.post('/', authenticateJWT, isAdmin, (req, res, next) => controller.createProduct(req, res, next))

// Get a product
router.get('/:id', (req, res, next) => controller.getProduct(req, res, next))

// Get all products
router.get('/', (req, res, next) => controller.getAllProducts(req, res, next))

// Update a product
router.put('/:id', authenticateJWT, isAdmin, (req, res, next) => controller.updateProduct(req, res, next))

// Delete a product
router.delete('/:id', authenticateJWT, isAdmin, (req, res, next) => controller.deleteProduct(req, res, next))