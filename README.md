# Node.js Backend Assignment

## Overview
This is a Node.js + TypeScript backend project built with **Express**.  
It provides a minimal API to simulate an e-commerce backend with **catalog**, **checkout**, and a simple **OAuth-like authentication flow**.

The data is stored **in-memory** (loaded from a JSON file) and resets when the server restarts.

---

##  Tech Stack
- Node.js (TypeScript)
- Express
- Zod (validation)
- Morgan (logging)
- express-rate-limit (basic rate limiting)
- JSON Web Token (JWT authentication)
- Jest + Supertest (unit & integration tests)

---

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YuraPetrovskyi/nodejs_server.git
   cd nodejs_server
   ```
2. Install dependencies:
```bash
  npm install
 ```
3. Create .env file (you can copy from .env.example):
   ```bash
   PORT=3000
   JWT_SECRET=change_me_in_production
   RATE_LIMIT_MAX=100
   ```
4. Start development server:
```bash
  npm run dev
 ```
5. Build project:
```bash
  npm run build
 ```
6. Run production server:
```bash
npm start
 ```

7. Run tests:
```bash
npm test
```
---

## API Endpoints
🔹 Health check

**GET** /ping 
respons
```bash
{ ok: true }
```

🔹 Catalog

**GET** /catalog?page=1&limit=10
Returns active products with pagination.
***Example response:***
```bash
{
  "items": [
  {
      "id": "prod_1",
      "title": "T-Shirt Classic",
      "price": 19.99,
      "inventory": 24,
      "isAvailable": true
    }
   ],
  "page": 1,
  "limit": 10,
  "total": 2  
}
```

### Checkout

**POST** /checkout

Validates items, calculates total, simulates payment intent, and updates inventory.

***Example request:***
```bash
{
  "items": [
    { "id": "prod_1", "qty": 1 },
    { "id": "prod_2", "qty": 2 }
  ]
}
```

***Example response:***
```bash
{
  "paymentIntent": {
    "id": "pi_123456",
    "clientSecret": "secret_abcdef",
    "amount": 118.99,
    "currency": "usd",
    "status": "requires_confirmation"
  },
  "items": [
    { "id": "prod_1", "qty": 1, "price": 19.99, "title": "T-Shirt Classic" },
    { "id": "prod_2", "qty": 2, "price": 49.5, "title": "Hoodie Premium" }
  ],
  "amount": 118.99
}
```
### Authentication

**Login**

**POST** /auth/login

***Request:***
```bash
{ "email": "user@example.com" }
```

***Response:***
```bash
{ "code": "auth_abcdef1234" }
```

**Token exchange**

POST /auth/token

***Request:***
```bash
{ "code": "auth_abcdef1234" }
```

***Response:***
```bash
{
  "accessToken": "jwt_token_here",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```
## Tests

jest is used with ts-jest and supertest.

Run all tests:
```bash
npm test
```

Includes:

- Unit tests (e.g. calculateTotal)

- Integration tests (GET /catalog)

## Assumptions & Trade-offs

- In-memory data store → all data resets on server restart (no database).

- OAuth flow simplified → login only checks email and generates a mock authorization code.

- Payment intent is mocked (no real Stripe/PayPal integration).

- Rate limiting is basic and uses environment variable RATE_LIMIT_MAX.

## 📂 Project Structure
```bash
src/
  app.ts             # Express app setup
  index.ts           # Entry point
  data/products.json # Mock product data
  middleware/        # Logging, rate limiting, error handling
  routes/            # auth, catalog, checkout endpoints
  services/          # Business logic (checkout, calculations)
  store/             # In-memory product store
  utils/             # JWT, validation
  tests/             # Jest + Supertest tests
```
