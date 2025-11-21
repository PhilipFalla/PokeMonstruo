require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Shopify config
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = '2025-07';

// Shopify products route
app.get('/api/products', async (req, res) => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges { node { url } }
            }
            variants(first: 1) {
              edges { node { price } }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      { query },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Shopify fetch failed' });
  }
});

// Example MongoDB routes (users, carts, orders)
// You can move these to separate route files if preferred
app.get('/api/users', async (req, res) => {
  // Example: fetch users from MongoDB
  res.json({ message: 'Users endpoint working' });
});

app.get('/api/cart', async (req, res) => {
  // Example: fetch cart from MongoDB
  res.json({ message: 'Cart endpoint working' });
});

app.get('/api/orders', async (req, res) => {
  // Example: fetch orders from MongoDB
  res.json({ message: 'Orders endpoint working' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));