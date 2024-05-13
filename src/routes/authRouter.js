/**
 * @file Defines the authentication router.
 * @module routes/router
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { UserController } from '../controllers/api/UserController.js'
import { authenticateJWT, isAdmin } from '../middlewares/auth.js'

// Create a router.
export const router = express.Router()

// Create a new user controller.
const controller = new UserController()

// Map HTTP verbs and route paths to controller action methods.

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
// Login
router.post('/login', (req, res, next) => controller.login(req, res, next))
// User Cart
router.post('/cart', authenticateJWT, (req, res, next) => controller.userCart(req, res, next))


// Refresh token
router.get('/refresh-token', (req, res, next) => controller.handleRefreshToken(req, res, next))
// Logout
router.get('/logout', (req, res, next) => controller.logout(req, res, next))
// Get all users
router.get('/all-users', (req, res, next) => controller.getAllUsers(req, res, next))
// Get wishlist
router.get('/wishlist', authenticateJWT, (req, res, next) => controller.getWishList(req, res, next))
// Get user by ID
router.get('/:id', authenticateJWT, isAdmin, (req, res, next) => controller.getUserById(req, res, next))


// Delete user by ID
router.delete('/:id', (req, res, next) => controller.deleteUser(req, res, next))

// Update user by ID
router.put('/edit-user', authenticateJWT, (req, res, next) => controller.updateUser(req, res, next))