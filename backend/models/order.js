const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  shipping: {
    recipientName: String,
    phone: String,
    address: String,
    instructions: String
  },
  payment: {
    cardHolder: String,
    cardNumber: String, // optional: don't store raw card info in production!
    expiryDate: String,
    cvv: String
  },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
