import express from "express";
import { addToCart } from "../Controller/cart.controller.js";


const router = express.Router();

// POST /api/cart
router.post("/", addToCart);

export default router;
