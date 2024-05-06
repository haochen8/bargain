/**
 * @file Defines the product model.
 * @module models/productModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'


// The product schema.
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: String,
    enum: ['Apple', 'Samsung', 'Intel']
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: {
   type: Array,
  },
  color: {
    type: String,
    enum: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray'],
  },
  ratings: [{
    star: Number,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, {
  timestamps: true,
})

productSchema.add(BASE_SCHEMA)

// Create a model using the schema.
export const ProductModel = mongoose.model('Product', productSchema)
