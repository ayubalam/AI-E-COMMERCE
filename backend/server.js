import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI);

console.log(
  "GEMINI KEY:",
  process.env.GEMINI_API_KEY
);

import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import cloudinary from "cloudinary";

// ROUTES
import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import couponRoutes from "./routes/couponRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

import chatRoutes from "./routes/chatRoutes.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();

// ===============================
// CLOUDINARY CONFIG
// ===============================
cloudinary.v2.config({

  cloud_name:
    process.env
      .CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env
      .CLOUDINARY_API_KEY,

  api_secret:
    process.env
      .CLOUDINARY_API_SECRET,
});

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());

app.use(express.json());

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "AI Ecommerce Backend Running 🚀",
  });
});

// ===============================
// TEST ROUTE
// ===============================
app.get("/test", async (req, res) => {

  try {

    const TestSchema =
      new mongoose.Schema({
        name: String,
      });

    const TestModel =
      mongoose.models.Test ||
      mongoose.model(
        "Test",
        TestSchema
      );

    const data =
      await TestModel.create({
        name:
          "AI Ecommerce",
      });

    res.status(201).json({
      success: true,
      message:
        "Test data inserted",
      data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
});

// ===============================
// API ROUTES
// ===============================
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/coupons",
  couponRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/users",
  userRoutes
);

// ===============================
// MONGODB CONNECTION
// ===============================
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    app.listen(
      process.env.PORT ||
        5000,
      () => {

        console.log(
          `Server Running On Port ${process.env.PORT}`
        );
      }
    );
  })
  .catch((error) => {

    console.log(
      "MongoDB Connection Error ❌"
    );

    console.log(error);
  });