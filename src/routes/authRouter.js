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
// Logout
router.post('/logout', (req, res, next) => controller.logout(req, res, next))
// Add to cart
router.post('/cart', authenticateJWT, (req, res, next) => controller.userCart(req, res, next))
// Create order
router.post('/cart/create-order', authenticateJWT, (req, res, next) => controller.createOrder(req, res, next))


// Refresh token
router.get('/refresh-token', (req, res, next) => controller.handleRefreshToken(req, res, next))

// Get all users
router.get('/all-users', authenticateJWT, isAdmin, (req, res, next) => controller.getAllUsers(req, res, next))

// Authenticated user
router.get('/me', authenticateJWT, (req, res, next) => controller.getMe(req, res, next));

// Get wishlist
router.get('/wishlist', authenticateJWT, (req, res, next) => controller.getWishList(req, res, next))

// Get cart
router.get('/cart', authenticateJWT, (req, res, next) => controller.getCart(req, res, next))

// Get user by ID
router.get('/:id', authenticateJWT, isAdmin, (req, res, next) => controller.getUserById(req, res, next))

// Delete cart
router.delete('/cart', authenticateJWT, (req, res, next) => controller.deleteCart(req, res, next))

// Delete product id from cart
router.delete('/cart/:id', authenticateJWT, (req, res, next) => controller.deleteCartItem(req, res, next))

// Delete user by ID
router.delete('/:id', authenticateJWT, isAdmin, (req, res, next) => controller.deleteUser(req, res, next))

// Update user by ID
router.put('/edit-user', authenticateJWT, (req, res, next) => controller.updateUser(req, res, next))
