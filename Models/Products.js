const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  description: { type: String },
  image: { type: String },
  pricing: { type: Number, required: true },
  shippingCost: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
