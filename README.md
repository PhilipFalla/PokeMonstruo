PokeMonstruo – Project Workflow Overview
========================================

This document explains how the different parts of the project fit together:

- Frontend (Angular)
- Backend (Node.js + Express)
- MongoDB (Atlas via Mongoose)
- Eventually: Shopify integration


1. High-Level Architecture
--------------------------

- The **frontend** is an Angular app in `/frontend`.
  - It calls the backend over HTTP (REST API).
  - It renders products, product detail pages, cart, and checkout UI.

- The **backend** is a Node.js/Express server in `/backend`.
  - It exposes REST endpoints under `/api/...`.
  - It uses **Mongoose** to talk to MongoDB Atlas.
  - It currently serves hardcoded product data and persists carts/orders/users.

- **MongoDB Atlas** stores:
  - Users
  - Carts
  - Orders
  - (In the future) Products (instead of hardcoded data)

- **Shopify** (planned):
  - Will eventually be another data source for products.
  - The frontend already has a [Shopify](cci:2://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:5:0-14:1) service that calls `/api/products` to get product data.
  - Later, the backend can be wired to Shopify’s API or a synced local Product collection.


2. Backend Workflow
-------------------

Location: `/backend`

2.1. Entry point: [server.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/server.js:0:0-0:0)
-----------------------------

- Sets up Express, CORS, JSON parsing, and routes:

  - `/api/users` → [routes/user.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/user.js:0:0-0:0)
  - `/api/cart` → [routes/cart.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/cart.js:0:0-0:0)
  - `/api/orders` → [routes/order.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/order.js:0:0-0:0)
  - `/api/products` → returns `mockProducts` (hardcoded array)

- Connects to MongoDB via Mongoose:

  - Uses `mongoose.connect(process.env.MONGO_URI)`
  - `MONGO_URI` is defined in `.env`
  - If the connection fails, no DB operations (cart, orders, users) will work.

2.2. MongoDB Models (Mongoose)
------------------------------

Defined in `/backend/models`:

- [models/user.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/models/user.js:0:0-0:0)
  - Schema: `email`, `name`, `passwordHash`, timestamps.
  - Represents users.

- [models/cart.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/models/cart.js:0:0-0:0)
  - Schema:
    - `userId` (String)
    - `items`: array of `{ productId, name, price, image, quantity }`
  - Represents each user’s cart.

- [models/order.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/models/order.js:0:0-0:0)
  - Schema:
    - `userId` (ObjectId → User)
    - `items`: array of `{ productId, name, price, quantity }`
    - `shipping` info
    - `payment` info
    - `status`
  - Represents orders placed by users.

These models are classes used inside the route handlers to query and store data in MongoDB.

2.3. Routes / Controllers
-------------------------

- [routes/user.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/user.js:0:0-0:0)
  - `POST /api/users/create`
  - Creates a new user document in MongoDB.

- [routes/cart.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/cart.js:0:0-0:0)
  - `GET /api/cart/:userId`
    - Finds the cart for a given `userId`.
    - Returns `{ items: [...] }` or an empty cart if none exists.
  - `POST /api/cart/:userId/add`
    - Request body: `{ productId, name, price, image, quantity }`.
    - Finds or creates a cart for that user.
    - If the product is already in the cart, updates its quantity/fields.
    - Otherwise, pushes a new item.
    - Saves the cart to MongoDB.
  - `POST /api/cart/:userId/remove`
    - Request body: `{ productId }`.
    - Removes the item with that `productId` from the user’s cart.
    - Saves updated cart.

- [routes/order.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/routes/order.js:0:0-0:0)
  - `POST /api/orders/create`
    - Request body: order data (userId, items, shipping, payment).
    - Creates a new order document in MongoDB.
  - `GET /api/orders/:userId`
    - Returns all orders for that user.

2.4. Products (currently hardcoded)
-----------------------------------

- In [server.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/server.js:0:0-0:0), there is a `mockProducts` array:

  - Each object: `{ id, title, description, image, price, ... }`
  - These are served via `GET /api/products`.

- The backend does NOT yet persist products to MongoDB.
  - They are stored in memory in [server.js](cci:7://file:///Users/philip/Desktop/PokeMonstruo/backend/server.js:0:0-0:0).
  - Later, we can:
    - Create a `Product` model.
    - Move `mockProducts` into MongoDB.
    - Or fetch/sync from Shopify.


3. Frontend Workflow
--------------------

Location: `/frontend`

3.1. Data Fetching: Shopify Service
-----------------------------------

File: [src/app/services/shopify.ts](cci:7://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:0:0-0:0)

- A simple Angular service that calls the backend:

  - `apiUrl = 'http://localhost:3000/api/products'`
  - [getProducts()](cci:1://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:11:2-13:3) → `GET /api/products`

- All product-list and carousel components use this service to retrieve product data from the backend.

3.2. Main Pages
---------------

- **Home / Carousels** (e.g. `new-products-carousel`)
  - Use [Shopify.getProducts()](cci:1://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:11:2-13:3) to load product items.
  - Display `item.image`, `item.name` (from `title`), `item.price`.
  - Clicking a product card navigates to `/producto/:id`.

- **Products List Page** (`products-list`)
  - Uses [Shopify.getProducts()](cci:1://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:11:2-13:3) on init.
  - Renders a grid of products with:
    - `[src]="p.image"`
    - `p.name` / `p.title`
    - `p.price`
  - `[routerLink]="['/producto', p.id]"` to go to the product detail page.

- **Product Detail Page** (`product`)
  - Reads `:id` from the route: `/producto/:id`.
  - Uses [Shopify.getProducts()](cci:1://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:11:2-13:3) to fetch all products, then finds the one with `prod.id === routeId`.
  - Maps backend fields to local `product` object:
    - `productId: p.id`
    - `name: p.title`
    - `description: p.description`
    - `price: p.price`
    - `image: p.image`
  - Displays:
    - `product.image`
    - `product.name`, `product.description`, `product.price`
  - “Add to Cart” button calls backend to add the selected product to the user’s cart.

- **Cart Page** (`cart`)
  - Has a [CartItem](cci:2://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/pages/checkout/checkout.ts:8:0-14:1) interface with `productId`, `name`, `price`, `quantity`, `image`.
  - On init:
    - Calls `GET /api/cart/:userId`.
    - Stores `res.items` in `cartItems`.
  - Template shows:
    - `[src]="item.image"` for the cart image
    - `item.name`, `item.price`
    - Quantity control that updates cart via `POST /api/cart/:userId/add`.
  - “Eliminar” button removes items via `POST /api/cart/:userId/remove`.
  - “Proceder al Pago” navigates to `/checkout`.

- **Checkout Page** (`checkout`)
  - On init:
    - Calls `GET /api/cart/:userId` to load items (including images).
  - Shows cart summary and total.
  - Collects shipping and payment info.
  - On “Pay”:
    - Sends `POST /api/orders/create` with order data.
    - On success, confirms and redirects (e.g. to home).

3.3. Authentication (simplified)
--------------------------------

- There is an `AuthService` used by the product page.
- The product page checks if the user is logged in before adding to cart; if not, redirects to `/auth`.
- For now, a hardcoded `userId` is used in cart/checkout to associate data with a single test user.


4. MongoDB Atlas
----------------

- The project uses a MongoDB Atlas cluster.
- Connection string is stored in `.env` as `MONGO_URI` (used by Mongoose).
- When the server starts (`npm start` in `/backend`), it attempts to connect to MongoDB:
  - If connection fails (e.g. network/DNS/IP issues), all DB operations (cart, orders, users) will fail.
  - Products currently do not depend on MongoDB because they use the in-memory `mockProducts` array.

- Collections in MongoDB (created by Mongoose when needed):
  - `users`
  - `carts`
  - `orders`
  - (Eventually: `products`)


5. Future: Shopify Integration
------------------------------

Goal:
- Use Shopify as the real product catalog, instead of hardcoded `mockProducts`.

Possible workflow:
1. **Backend retrieves products** from Shopify’s Storefront/Admin APIs.
2. **Normalize and cache** data in MongoDB (optional) so the backend can serve `/api/products` without hitting Shopify every time.
3. **Frontend remains unchanged**, still calling:
   - [Shopify.getProducts()](cci:1://file:///Users/philip/Desktop/PokeMonstruo/frontend/src/app/services/shopify.ts:11:2-13:3) → `/api/products`
   - And receiving the same shape: `{ id, title, description, image, price, ... }`

Benefits:
- You can fully manage products, inventory, etc. in Shopify.
- The frontend/backend continue to work with a consistent product shape.


6. Dev Workflow Summary
-----------------------

- **Start backend**:
  - `cd backend`
  - `npm install` (first time)
  - `npm start`
  - Ensure `MONGO_URI` in `.env` is valid and MongoDB Atlas allows your IP.

- **Start frontend**:
  - `cd frontend`
  - `npm install` (first time)
  - `npm start` or relevant Angular dev command
  - The frontend makes HTTP requests to `http://localhost:3000/api/...`

- **Data flow examples**:
  - Product listing:
    - Frontend → `GET /api/products` → backend returns `mockProducts`.
  - Product detail:
    - Frontend → `GET /api/products`, picks one by `id`.
  - Add to cart:
    - Frontend → `POST /api/cart/:userId/add` with product info.
    - Backend updates MongoDB.
  - Cart / checkout:
    - Frontend → `GET /api/cart/:userId` to show items and images.
  - Place order:
    - Frontend → `POST /api/orders/create`.
    - Backend saves order to MongoDB.

This is the current workflow of the project across frontend, backend, MongoDB, and the planned Shopify integration.
