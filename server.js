import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.routes.js"
import authRoutes from "./routes/auth.routes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes)
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ShoppyGlobe Backend API Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
