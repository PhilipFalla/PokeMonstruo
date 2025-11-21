// server.js (simplified)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mock products
const mockProducts = [
  {
    id: 'prod_1',
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    image: '/assets/product-placeholder.avif',
    price: 50
  },
  {
    id: 'prod_2',
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    image: '/assets/product-placeholder.avif',
    price: 75
  },
  // Add more as needed
];

app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));