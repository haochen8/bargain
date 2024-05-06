/**
 * @file Defines the product router.
 * @module routes/productRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { ProductController } from '../controllers/api/ProductController.js'

// Create a router.
export const router = express.Router()

// Create a new product controller.
const controller = new ProductController()

// Map HTTP verbs and route paths to controller action methods.

// Create a new product
router.post('/', (req, res, next) => controller.createProduct(req, res, next))