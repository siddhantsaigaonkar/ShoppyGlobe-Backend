import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController.js";



const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

export default router;
