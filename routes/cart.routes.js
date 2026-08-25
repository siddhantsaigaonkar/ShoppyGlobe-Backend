import express from "express";

import {
  addToCart,
  updateCart,
  removeFromCart,
  getCart
} from "../Controller/cart.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Protected route - only logged-in users can view their cart
router.get("/", authMiddleware, getCart);


// POST /api/cart
router.post("/", authMiddleware, addToCart);

// PUT /api/cart/:id
router.put("/:id", authMiddleware, updateCart);

// DELETE /api/cart/:id
router.delete("/:id", authMiddleware, removeFromCart);

export default router;
