// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from 'fs';






// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { loginUser } from "./controllers/userController.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.post('/api/login', async (req, res) => {
  // Forward the login request to the loginUser function
  const response = await loginUser(req, res);

  // Set the token as a cookie
  res.cookie("jwt", response.data.token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // Send the response to the client
  res.json(response.data);
});


app.use(cors({
  origin: ["http://localhost:5173", "https://e-shop-frontend-beta.vercel.app"],
  credentials: true
}));





const __dirname = path.resolve();

const dirPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

app.use("uploads", express.static(path.join(__dirname,  "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});



app.listen(port, () => console.log(`Server running on port: ${port}`));
