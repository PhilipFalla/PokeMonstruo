const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);