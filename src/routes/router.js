/**
 * @file Defines the main router.
 * @module routes/mainRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import http from 'node:http'
import { router as authRouter } from './authRouter.js'
import { router as productRouter } from './productRouter.js'

// Create a router.
export const router = express.Router()



// Register routes.
router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to this server side!' }))
router.use('/api/user', authRouter)
router.use('/api/product', productRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode

  next(error)
})
