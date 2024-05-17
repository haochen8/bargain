/**
 * @file Defines the order model.
 * @module models/orderModel
 * @author Hao Chen
 * @version 3.1.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

// The order schema.
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {
      // Mock payment intent
      id: String,
      amount: Number,
      currency: String,
      status: String,
      type: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Succeeded", "Failed"],
      },
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

orderSchema.add(BASE_SCHEMA);

// Create a model using the schema and export it.
export const OrderModel = mongoose.model("Order", orderSchema);
