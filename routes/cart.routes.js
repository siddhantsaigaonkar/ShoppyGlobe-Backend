import express from "express";
import { addToCart,updateCart } from "../Controller/cart.controller.js";


const router = express.Router();

// POST /api/cart
router.post("/", addToCart);
// PUT /api/cart/:id
router.put("/:id", updateCart);

export default router;
