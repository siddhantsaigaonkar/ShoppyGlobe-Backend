import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      type: String,
      required: true,
    },

    // User's email
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Hashed password will be stored here
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
