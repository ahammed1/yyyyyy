# AURA Commerce

A React/Vite storefront with a NestJS REST API, PostgreSQL persistence through Prisma, customer accounts, product administration, carts, orders, and Razorpay checkout.

## Requirements

- Node.js 20 or newer
- PostgreSQL 16 or newer (or Docker Compose)
- A Razorpay account and test API keys to complete test checkout

## Local setup

1. Install the frontend dependencies from the project root:

   ```sh
   npm install
   ```

2. Start PostgreSQL. If Docker is installed:

   ```sh
   npm run db:up
   ```

   Or create a PostgreSQL database named `shop_platform` yourself.

3. Configure the backend:

   ```sh
   copy backend\.env.example backend\.env
   ```

   Set `DATABASE_URL` to use the password you chose when installing PostgreSQL. If that password contains URL-reserved characters, percent-encode it in the URL. Replace `JWT_SECRET` with a random value of at least 32 characters. Set `ADMIN_EMAIL` and a strong `ADMIN_PASSWORD` only if you want the seed script to create an administrator. Add Razorpay **test** key values to enable checkout. Keep the secret key server-side; never put it in a `VITE_*` variable.

   On PowerShell, create a random JWT secret with:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Copy the output into `JWT_SECRET` in `backend\.env`.

4. Install API dependencies and initialize PostgreSQL:

   ```sh
   cd backend
   npm install
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

5. In two terminals, start the API and storefront:

   ```sh
   cd backend
   npm run start:dev
   ```

   ```sh
   npm run dev
   ```

   The API runs at `http://localhost:3000/api`; the storefront runs at `http://localhost:5173`. The frontend API URL can be overridden in a root `.env` file using `VITE_API_URL`.

   Check API and database readiness at `http://localhost:3000/api/health`. A database authentication error means the PostgreSQL username/password in `backend\.env` must match the credentials used to connect to the local PostgreSQL server.

## Features and API

- `GET /api/products` and `GET /api/products/:id` provide the searchable public catalog.
- `GET /api/health` checks API and PostgreSQL connectivity.
- `POST /api/auth/register`, `POST /api/auth/login`, and `GET /api/auth/me` provide customer accounts and JWT sessions.
- Authenticated customers can manage their cart at `GET /api/cart` and `PUT /api/cart/items`.
- Authenticated checkout creates a pending order and Razorpay order. `POST /api/orders/verify-payment` verifies the provider signature server-side before marking an order paid and decrementing inventory.
- `GET /api/orders` lists the current customer's orders.
- Administrators can create, update, and archive products, view all orders, and update paid order fulfilment status.

The initial admin is only created by the seed script when both `ADMIN_EMAIL` and `ADMIN_PASSWORD` are configured. Public registration always creates customer accounts.

## Scripts

At the project root: `npm run dev`, `npm run build`, `npm run lint`, `npm run backend:dev`, `npm run backend:build`, `npm run db:generate`, `npm run db:migrate`, `npm run db:seed`, and `npm run db:up`.
