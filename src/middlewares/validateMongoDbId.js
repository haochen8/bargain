/**
 * @file Validates the user ID.
 * @module middlewares/validateId
 * @author Hao Chen
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Validates the user ID.
 */
export const validateMongoDbId = (id) => {
  console.log('id:', id)
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid) {
    throw new Error('Invalid ID.')
  }
}