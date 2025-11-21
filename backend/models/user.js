const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String }, // for authentication (optional)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
