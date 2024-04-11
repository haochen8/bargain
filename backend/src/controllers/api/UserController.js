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
      const { username, password, email, firstName, lastName } = req.body

      // Check if the username or email already exists.
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] })
      if (existingUser) {
        req.session.flash = { type: 'danger', text: 'The username or email is already taken.' }
        return res.redirect('/register')
      }

      // Create a new user.
      const newUser = new UserModel({ username, password, email, firstName, lastName});
      await newUser.save()      

      // Automatically log in the user after registration.
      req.session.userId = newUser._id
      console.log('User created successfully.', { user: newUser })

      // Redirect to the home page.
      req.session.save(() => res.redirect('/'))
    } catch (error) {
      console.error('Error creating user.', { error: error.message })
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/register')
    }
  }
}


