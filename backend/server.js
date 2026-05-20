import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Home Route
app.get("/", (req, res) => {

  res.json({
    message:
      "AI Ecommerce Backend Running 🚀",
  });
});

// Test Route
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

    // Insert Data
    const data =
      await TestModel.create({
        name: "AI Ecommerce",
      });

    res.json({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          `Server Running On Port ${process.env.PORT}`
        );
      }
    );
  })
  .catch((error) => {

    console.log(error);
  });