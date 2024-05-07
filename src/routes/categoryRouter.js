/**
 * @file Defines the category router.
 * @module routes/categoryRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { CategoryController } from '../controllers/api/CategoryController.js'
import { authenticateJWT, isAdmin } from '../middlewares/auth.js'

// Create a router.
export const router = express.Router()

// Create a new category controller.
const controller = new CategoryController()

// Map HTTP verbs and route paths to controller action methods.

// Create a new category
router.post('/', authenticateJWT, isAdmin, (req, res, next) => controller.createCategory(req, res, next))