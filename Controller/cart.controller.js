import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cartItem = await Cart.create({
      productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUT /cart/:id
// Update the quantity of a product in the cart
export const updateCart = async (req, res) => {
  try {
    // Extract cart item ID from request parameters
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    // Extract updated quantity from request body
    const { quantity } = req.body;

    // Find the cart item by ID and update its quantity
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      {
        new: true, // Return the updated document
        runValidators: true, // Apply schema validations
      }
    );

    // If cart item doesn't exist, return 404
    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// DELETE /cart/:id
// Remove a product from the cart
export const removeFromCart = async (req, res) => {
  try {
    // Extract cart item ID from request parameters
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    // Find the cart item by ID and delete it
    const deletedCart = await Cart.findByIdAndDelete(id);

    // If cart item doesn't exist, return 404
    if (!deletedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};