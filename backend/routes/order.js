const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/create', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;
