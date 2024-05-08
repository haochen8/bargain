/**
 * @file Defines the brand model.
 * @module models/brandModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

// The brand schema.
const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.add(BASE_SCHEMA);

// Create a model using the schema and export it.
export const BrandModel = mongoose.model("Brand", brandSchema);
