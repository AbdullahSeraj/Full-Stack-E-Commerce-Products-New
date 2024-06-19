const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, requried: true },
    description: { type: String, requried: true },
    brand: { type: String, requried: true },
    category: { type: String, requried: true },
    images: { type: Array, requried: true },
    price: { type: Number, requried: true },
    selling: { type: Number, requried: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
