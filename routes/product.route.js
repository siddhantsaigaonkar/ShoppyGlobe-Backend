import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../Controller/product.controller.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Create a new product
router.post("/", createProduct);

// Update an existing product
router.put("/:id", updateProduct);

export default router;
