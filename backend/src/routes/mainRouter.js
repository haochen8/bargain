/**
 * @file Defines the main router.
 * @module routes/mainRouter
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'
import http from 'node:http'
import { router } from './router.js'
import { router as authRouter } from './authRouter.js'

// Create a router.
export const mainRouter = express.Router()

// Register routes.
mainRouter.use('/', mainRouter)
mainRouter.use('/api/user', authRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode

  next(error)
})
