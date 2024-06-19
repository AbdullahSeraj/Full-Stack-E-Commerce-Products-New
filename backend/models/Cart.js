const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
