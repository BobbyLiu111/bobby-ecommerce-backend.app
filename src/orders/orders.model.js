const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    products: [
      {
        productId: { type: String, require: true },
        quantity: { type: Number, require: true },
      },
    ],
    amount: Number,
    email: { type: String, require: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed"],
      default: ["pending"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
