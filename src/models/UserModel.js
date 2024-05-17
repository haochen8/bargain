/**
 * @file Defines the user model.
 * @module models/UserModel
 * @author Hao Chen
 * @version 3.1.0
 */

import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'
import { BASE_SCHEMA } from './baseSchema.js'

const { isEmail } = validator

// The user schema.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    // - A valid username should start with an alphabet so, [A-Za-z].
    // - All other characters can be alphabets, numbers or an underscore so, [A-Za-z0-9_-].
    // - Since length constraint is 3-256 and we had already fixed the first character, so we give {2, 255}.
    // - We use ^ and $ to specify the beginning and end of matching.
    match: [/^[A-Za-z][A-Za-z0-9_-]{2,255}$/, 'Please provide a valid username.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minLength: [10, 'The password must be of minimum length 10 characters.'],
    maxLength: [256, 'The password must be of maximum length 256 characters.']
  },
  role: {
    type: String,
    default: 'user',
    enum : ['user', 'admin']
  },
  cart: {
    type: Array,
    default: []
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  refreshToken: {
    type: String,
  }
}, {
  timestamps: true,
  versionKey: false
})


// Hash the password before saving the user model.
userSchema.pre('save', async function save (next) {
  if (!this.isModified('password')) { return next() }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

/**
 * Compare the password with the hashed password.
 *
 * @param {string} username - The username to compare.
 * @param {string} password - The password to compare.
 * @returns {Promise} A promise that resolves to true if the password matches, otherwise it rejects.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If the user is not found or the password does not match, throw an error.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password.')
  }
  // Otherwise, return the user.
  return user
}
userSchema.add(BASE_SCHEMA)

// Create a model using the schema.
export const UserModel = mongoose.model('User', userSchema)
