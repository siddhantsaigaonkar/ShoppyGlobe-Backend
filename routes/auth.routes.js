import express from "express";

import { register, login,logout } from "../Controller/auth.controllers.js";

const router = express.Router();

// Register new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Logout
router.post("/logout", logout);

export default router;
