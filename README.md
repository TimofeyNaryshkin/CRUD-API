# CRUD API - Product Catalog

A simple CRUD API for managing a Product Catalog built with Fastify and TypeScript, using an in-memory database.

## Prerequisites

- Node.js 24.10.0 or higher

## Installation

```bash
git clone https://github.com/TimofeyNaryshkin/CRUD-API.git
cd CRUD-API
npm install
```

## Configuration

Create a `.env` file in the root directory:

```
PORT=4000
```

The server will default to port `4000` if not specified.

## Running the Application

### Development mode

Runs the server with auto-reload on file changes:

```bash
npm run start:dev
```

### Production mode

Builds the application bundle and runs it:

```bash
npm run start:prod
```

## API Endpoints

Base URL: `http://localhost:4000`

### Get all products

```
GET /api/products
```

**Response:** `200` — array of products

### Get product by ID

```
GET /api/products/{productId}
```

**Response:**
- `200` — product object
- `400` — invalid productId (not a valid UUID)
- `404` — product not found

### Create product

```
POST /api/products
```

**Request body:**

```json
{
  "name": "string",
  "description": "string",
  "price": 123.45,
  "category": "string",
  "inStock": true
}
```

**Response:** `201` — created product with generated `id`

### Update product

```
PUT /api/products/{productId}
```

**Request body:** any subset of product fields

```json
{
  "price": 99.99,
  "inStock": false
}
```

**Response:**
- `200` — updated product
- `400` — invalid productId
- `404` — product not found

### Delete product

```
DELETE /api/products/{productId}
```

**Response:**
- `204` — product deleted successfully
- `400` — invalid productId
- `404` — product not found

## Product Schema

| Field       | Type    | Required |
|-------------|---------|----------|
| id          | string  | auto-generated (UUID) |
| name        | string  | yes      |
| description | string  | yes      |
| price       | number  | yes (positive) |
| category    | string  | yes      |
| inStock     | boolean | yes      |

## Testing

```bash
npm test
```
