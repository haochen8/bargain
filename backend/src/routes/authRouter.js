/**
 * @file Defines the authentication router.
 * @module routes/router
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import { UserController } from '../controllers/api/UserController.js'

// Create a router.
export const router = express.Router()

// Create a new user controller.
const controller = new UserController()

// Map HTTP verbs and route paths to controller action methods and

router.post('/register', (req, res, next) => controller.register(req, res, next))
