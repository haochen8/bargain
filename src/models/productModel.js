/**
 * @file Defines the product model.
 * @module models/productModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

// The product schema.
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    descriptionImages: {
      type: [String],
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      required: true,
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
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.add(BASE_SCHEMA);

// Create a model using the schema.
export const ProductModel = mongoose.model("Product", productSchema);
