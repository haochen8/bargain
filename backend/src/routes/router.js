/**
 * @file Defines the router.
 * @module routes/router
 * @author Hao Chen
 * @version 3.1.0
 */

import express from 'express'

// Create a router.
export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to this server side!' }))