/**
 * @file Defines the userController
 * @module controllers/userController
 * @author Hao Chen
 * @version 3.1.0
 */

import { UserModel } from '../../models/UserModel.js'

/**
 * Encapsulates the user controller.
 */
export class UserController {

  /**
   * Registers a new user.
   * 
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {void} This function does not return a value; it either calls next() or sends a response.
   */
  async register (req, res, next) {
    try {
      console.log('Creating user...', { body: req.body })

      // Get the username and password from the request body.
      const { firstName, lastName, email, username, password } = req.body

      // Check if the username or email already exists.
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] })
      if (existingUser) {
        return res
          .status(400)
          .json({
            success: false, 
            message: 'Username or email already exists.' 
          })
      }

      // Create a new user.
      const newUser = UserModel.create({ firstName, lastName, email, username, password })

      // Check if the user was created successfully.
      if (!newUser) {
        return res
          .status(500)
          .json({
            success: false, 
            message: 'Failed creating user.' 
          })
      }

      // Automatically log in the user after registration.
      req.session.userId = newUser._id
      console.log('User created successfully.', { user: newUser })

      // Redirect to the home page.
      res.redirect('/')
    } catch (error) {
      console.error('Error creating user.', { error: error.message })
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/')
    }
  }
}


