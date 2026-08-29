# ShoppyGlobe Backend API

## Project Overview

ShoppyGlobe Backend is an e-commerce REST API developed using **Node.js**, **Express.js**, and **MongoDB**.

The backend provides APIs for user authentication, product management, and shopping cart management. JWT-based authentication is implemented to protect cart routes so that only authenticated users can access their cart.

---

## Features

* User registration
* User login
* JWT-based authentication
* Protected cart routes
* Product CRUD operations
* Get all products
* Get product by ID
* Add products to cart
* View cart items
* Update cart quantity
* Remove products from cart
* MongoDB database integration
* Input validation
* Error handling
* API testing with Postman
* MongoDB collection screenshots
* Project documentation

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* dotenv
* CORS
* Postman
* Git
* GitHub

---

## Environment Variables

Create a `.env` file in the root directory of the project.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Environment Variable Description

* `PORT` - Port on which the Express server runs.
* `MONGO_URI` - MongoDB connection string used to connect the application to MongoDB.
* `JWT_SECRET` - Secret key used to generate and verify JWT authentication tokens.

> Replace the placeholder values with your own MongoDB connection string and JWT secret.
>
> The actual `.env` file is not included in the GitHub repository for security reasons.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/siddhantsaigaonkar/ShoppyGlobe-Backend.git
```

### 2. Navigate to the Project Directory

```bash
cd ShoppyGlobe-Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create the `.env` File

Create a `.env` file in the project root and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Start the Server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

---

## API Endpoints

### Authentication APIs

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/register` | Register a new user    |
| POST   | `/api/login`    | Login an existing user |

### Product APIs

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/products`     | Get all products     |
| GET    | `/api/products/:id` | Get a single product |
| POST   | `/api/products`     | Create a product     |
| PUT    | `/api/products/:id` | Update a product     |
| DELETE | `/api/products/:id` | Delete a product     |

### Cart APIs

Cart APIs are protected using JWT authentication.

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/cart`     | Get logged-in user's cart  |
| POST   | `/api/cart`     | Add a product to cart      |
| PUT    | `/api/cart/:id` | Update cart item quantity  |
| DELETE | `/api/cart/:id` | Remove a product from cart |

---

## Authentication

The application uses **JWT (JSON Web Token)** for authentication.

After successful login, the API returns a JWT token.

For protected cart APIs, send the token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Only authenticated users can access cart operations.

---

## Request Examples

### Register

**POST**

```text
/api/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

**POST**

```text
/api/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add Product to Cart

**POST**

```text
/api/cart
```

Request body:

```json
{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
```

Header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Validation and Error Handling

The API includes validation and error handling for different situations, including:

* Missing required fields
* Invalid MongoDB ObjectId
* Product not found
* Cart item not found
* Invalid quantity
* Invalid or expired JWT token
* Unauthorized access
* Server/database errors

Appropriate HTTP status codes such as `400`, `401`, `404`, `500`, and `200`/`201` are returned based on the request result.

---

## API Testing

All APIs were tested using **Postman**.

Testing screenshots are included in the repository under the `screenshots` directory.

The screenshots include:

* Authentication API testing
* Product API testing
* Cart API testing
* MongoDB collections

---

## MongoDB

MongoDB is used to store application data.

The project uses the following collections:

* `users`
* `products`
* `carts`

The MongoDB screenshots are included in the repository for documentation and verification.

---

## Screenshots

### Authentication API

Authentication API testing screenshots are available in:

```text
screenshots/auth/
```

### Product API

Product API testing screenshots are available in:

```text
screenshots/products/
```

### Cart API

Cart API testing screenshots are available in:

```text
screenshots/cart/
```

### MongoDB

MongoDB collection screenshots are available in:

```text
screenshots/mongodb/
```

---

## Project Repository

**GitHub Repository:**

https://github.com/siddhantsaigaonkar/ShoppyGlobe-Backend

---

## Author

**Siddhant Saigaonkar**

**GitHub Profile:**

https://github.com/siddhantsaigaonkar

**Project:**

ShoppyGlobe Backend API

---


