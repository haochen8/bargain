/**
 * @file Defines the category model.
 * @module models/categoryModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'


// The category schema.
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
}, {
  timestamps: true,
})

categorySchema.add(BASE_SCHEMA)

// Create a model using the schema and export it.
export const CategoryModel = mongoose.model('Category', categorySchema)
