const express = require('express');
const router = express.Router();
const axios = require('axios');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = '2025-07';

router.get('/', async (req, res) => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            images(first: 1) { edges { node { url } } }
            variants(first: 1) { edges { node { price } } }
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

module.exports = router;