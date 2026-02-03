const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  slug: String,
  price: Number,
  description: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

// Lưu ý: "products" là tên collection trong MongoDB của bạn
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;