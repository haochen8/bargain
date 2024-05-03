/**
 * @file Defines the authentication router.
 * @module routes/router
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { UserController } from '../controllers/api/UserController.js'
import { authenticateJWT } from '../middlewares/auth.js'

// Create a router.
export const router = express.Router()

// Create a new user controller.
const controller = new UserController()

// Map HTTP verbs and route paths to controller action methods and

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))

// Login
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Get all users
router.get('/all-users', (req, res, next) => controller.getAllUsers(req, res, next))

// Get user by ID
router.get('/:id', authenticateJWT, (req, res, next) => controller.getUserById(req, res, next))

// Delete user by ID
router.delete('/:id', (req, res, next) => controller.deleteUser(req, res, next))

// Update user by ID
router.put('/:id', (req, res, next) => controller.updateUser(req, res, next))