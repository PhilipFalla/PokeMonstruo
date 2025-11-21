BACKEND REST API

Base URL (local development):
- Backend: http://localhost:3000
- All endpoints are JSON-based and expect Content-Type: application/json where a body is required.

--------------------------------------------------
USERS
--------------------------------------------------

POST /api/users/create
----------------------
Create a user.

Body:
{
  "name": "Ash Ketchum",
  "email": "ash@example.com",
  "password": "plain-or-hash",
  "...": "any other fields supported by the User model"
}

Response 200:
{
  "_id": "69205dee72f65322c5f48d3f",
  "name": "Ash Ketchum",
  "email": "ash@example.com",
  "...": "other user fields"
}

--------------------------------------------------
CART
--------------------------------------------------
All cart endpoints are scoped by :userId (MongoDB _id of the user).

GET /api/cart/:userId
---------------------
Get the current cart for a user.

Params:
- userId: user’s ID.

Response 200 (cart exists):
{
  "_id": "664f1234...",
  "userId": "69205dee72f65322c5f48d3f",
  "items": [
    {
      "productId": "prod_1",
      "name": "Producto 1",
      "price": 50,
      "image": "https://...",
      "quantity": 2
    }
  ]
}

Response 200 (no cart yet):
{
  "items": []
}

POST /api/cart/:userId/add
--------------------------
Create or update an item in the user’s cart.

Behavior:
- If the item does not exist, it is added.
- If the item already exists, its quantity is replaced with the new value.

Params:
- userId: user’s ID.

Body:
{
  "productId": "prod_1",
  "name": "Producto 1",
  "price": 50,
  "image": "https://...",
  "quantity": 3
}

Response 200:
{
  "_id": "664f1234...",
  "userId": "69205dee72f65322c5f48d3f",
  "items": [ /* updated items array */ ]
}

POST /api/cart/:userId/remove
-----------------------------
Remove a single product from the user’s cart.

Params:
- userId: user’s ID.

Body:
{
  "productId": "prod_1"
}

Responses:
- 200 OK: returns the updated cart.
- 404 Not Found: if the cart does not exist.

--------------------------------------------------
ORDERS
--------------------------------------------------

POST /api/orders/create
-----------------------
Create a new order. Typically called from checkout with cart items and shipping/payment info.

Body (example):
{
  "userId": "69205dee72f65322c5f48d3f",
  "items": [
    {
      "productId": "prod_1",
      "name": "Producto 1",
      "price": 50,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "shipping": {
    "recipientName": "Ash Ketchum",
    "phone": "+50212345678",
    "address": "Pallet Town",
    "instructions": "Leave at the front desk"
  },
  "payment": {
    "cardHolder": "Ash Ketchum",
    "cardNumber": "4111111111111111",
    "expiryDate": "12/28",
    "cvv": "123"
  }
}

Response 200:
{
  "_id": "66501234...",
  "userId": "69205dee72f65322c5f48d3f",
  "items": [ /* items */ ],
  "shipping": { /* shipping */ },
  "payment": { /* payment as stored */ },
  "createdAt": "2025-11-21T12:34:56.789Z",
  "...": "other Order fields"
}

GET /api/orders/:userId
-----------------------
Get all orders for a user.

Params:
- userId: user’s ID.

Response 200:
[
  {
    "_id": "66501234...",
    "userId": "69205dee72f65322c5f48d3f",
    "items": [ /* ... */ ],
    "shipping": { /* ... */ },
    "payment": { /* ... */ }
  }
]

--------------------------------------------------
PRODUCTS
--------------------------------------------------
There are two product-related sources in the project:

1) Mock products served from the backend (currently used by the Angular app).
2) Shopify products proxy route (defined but not mounted in server.js).

1) MOCK PRODUCTS (CURRENTLY USED)

GET /api/products
-----------------
Returns a static array of mock products.

Response 200 (example):
[
  {
    "id": "prod_1",
    "title": "Producto 1",
    "description": "Descripción del producto 1",
    "image": "/assets/product-placeholder.avif",
    "price": 50
  },
  {
    "id": "prod_2",
    "title": "Producto 2",
    "description": "Descripción del producto 2",
    "image": "/assets/product-placeholder.avif",
    "price": 75
  }
]

This route is defined directly in server.js:
app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

2) SHOPIFY PRODUCTS PROXY (NOT CURRENTLY MOUNTED)

Defined in backend/routes/products.js:

Route:
- GET /

Behavior:
- Proxies to Shopify Storefront GraphQL API using SHOPIFY_STORE,
  SHOPIFY_STOREFRONT_TOKEN, SHOPIFY_API_VERSION.
- Returns Shopify GraphQL response JSON.

To expose under /api/products instead of mocks, you would:
  const productsRoutes = require('./routes/products');
  app.use('/api/products', productsRoutes);
and remove or replace the mock /api/products handler in server.js.

--------------------------------------------------
ERROR RESPONSES
--------------------------------------------------
Most endpoints use a common pattern for errors:

500 Internal Server Error:
{
  "error": "Error message here"
}