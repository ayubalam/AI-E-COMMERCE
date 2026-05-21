import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();


// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());


// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "AI Ecommerce Backend Running 🚀",
  });
});


// ===============================
// Test Route
// ===============================
app.get("/test", async (req, res) => {

  try {

    // Schema
    const TestSchema =
      new mongoose.Schema({
        name: String,
      });

    // Model
    const TestModel =
      mongoose.models.Test ||
      mongoose.model(
        "Test",
        TestSchema
      );

    // Insert Test Data
    const data =
      await TestModel.create({
        name: "AI Ecommerce",
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
      message: error.message,
    });
  }
});


// ===============================
// API Routes
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

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    app.listen(
      process.env.PORT || 5000,
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