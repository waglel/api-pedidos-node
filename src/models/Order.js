const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  value: Number,
  creationDate: Date,
  items: [itemSchema]
});

module.exports = mongoose.model("Order", orderSchema);
