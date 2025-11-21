const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

router.post('/:userId/add', async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) cart = new Cart({ userId: req.params.userId, items: [] });

  // Check if item exists
  const index = cart.items.findIndex(item => item.productId === productId);
  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, image, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.post('/:userId/remove', async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  cart.items = cart.items.filter(item => item.productId !== productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
