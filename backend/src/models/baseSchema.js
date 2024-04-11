/**
 * @file Defines the base schema.
 * @module models/baseSchema
 * @author Mats Loock
 * @version 3.1.0
 */

import mongoose from 'mongoose'
import { logger } from '../config/winston.js'

// Options to use converting the document to a plain object and JSON.
const convertOptions = {
  getters: true, // Include getters and virtual properties.
  versionKey: false, // Exclude the __v property.
  /**
   * Transforms the document, removing the _id property.
   *
   * @param {object} doc - The mongoose document which is being converted.
   * @param {object} ret - The plain object representation which has been converted.
   * @returns {object} The transformed object.
   * @see https://mongoosejs.com/docs/api.html#document_Document-toObject
   */
  transform: (doc, ret) => {
    logger.silly('Transforming document', { doc: doc.toObject({ transform: null }) })
    delete ret._id // Exclude the _id property.
    logger.silly('Transformed document', { ret })
    return ret
  }
}

// Create a schema.
const baseSchema = new mongoose.Schema({}, {
  // Add and maintain createdAt and updatedAt fields.
  timestamps: true,
  // Set the options to use when converting the document to a POJO (or DTO) or JSON.
  // POJO = Plain Old JavaScript Object
  // DTO = Data Transfer Object
  toObject: convertOptions,
  toJSON: convertOptions,
  // Enable optimistic concurrency control. This is a strategy to ensure the
  // document you're updating didn't change between when you loaded it, and
  // when you update it.
  optimisticConcurrency: false
})

export const BASE_SCHEMA = Object.freeze(baseSchema)
