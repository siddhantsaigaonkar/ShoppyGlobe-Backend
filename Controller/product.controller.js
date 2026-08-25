import Product from "../models/product.model.js";
import mongoose from "mongoose";
// GET /products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET /products/:id
export const getProductById = async (req, res) => {
  try {
    // Get product ID from URL
    const { id } = req.params;

    // Check if ID is a valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Find product by ID
    const product = await Product.findById(id);

    // If product doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send product
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Extract updated product details from request body
    const { name, price, description, stock, image, category } = req.body;

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        stock,
        image,
        category,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Apply schema validations
      },
    );

    // If product doesn't exist, return 404
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// delete product
export const deleteProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Return 404 if product doesn't exist
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};