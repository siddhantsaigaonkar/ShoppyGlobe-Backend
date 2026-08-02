import express from "express";
import { addToCart,updateCart,removeFromCart } from "../Controller/cart.controller.js";


const router = express.Router();

// POST /api/cart
router.post("/", addToCart);
// PUT /api/cart/:id
router.put("/:id", updateCart);
// DELETE /api/cart/:id
router.delete("/:id", removeFromCart);

export default router;
