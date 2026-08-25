import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../Controller/product.controller.js";



const router = express.Router();


router.use((req, res, next) => {
  console.log(`product routes`);
  next()
})

// Get all products
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Create a new product
router.post("/" ,createProduct);

// Update an existing product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);


export default router;
