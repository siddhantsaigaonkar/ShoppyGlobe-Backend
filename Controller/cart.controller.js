import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    // Get product ID and quantity from request body
    const { productId, quantity = 1 } = req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Check if quantity is valid
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Check whether the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if this product already exists in the logged-in user's cart
    const existingCartItem = await Cart.findOne({
      userId: req.userId,
      productId,
    });

    // If the product already exists, increase its quantity
    if (existingCartItem) {
      existingCartItem.quantity += Number(quantity);

      // Save the updated quantity
      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated successfully",
        cartItem: existingCartItem,
      });
    }

    // If the product is not in the cart, create a new cart item
    const cartItem = await Cart.create({
      userId: req.userId,
      productId,
      quantity: Number(quantity),
    });

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET /cart
// Get all cart items belonging to the logged-in user
export const getCart = async (req, res) => {
  try {
    // Find cart items only for the logged-in user
    const cartItems = await Cart.find({
      userId: req.userId,
    }).populate("productId");

    // Return the user's cart
    res.status(200).json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    // Handle unexpected server errors
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
    // Get cart item ID from URL
    const { id } = req.params;

    // Get new quantity from request body
    const { quantity } = req.body;

    // Validate cart ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Update only if the cart item belongs to the logged-in user
    const updatedCart = await Cart.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      {
        quantity: Number(quantity),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // Cart item doesn't exist or doesn't belong to this user
    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
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
    const deletedCart = await Cart.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

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