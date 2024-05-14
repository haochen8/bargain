/**
 * @file Defines the cart model.
 * @module models/cartModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

// The cart schema.
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

cartSchema.add(BASE_SCHEMA);

// Create a model using the schema and export it.
export const CartModel = mongoose.model("Cart", cartSchema);
