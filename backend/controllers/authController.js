import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// Register
export const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // Check User
      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // Hash Password
      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // Create User
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
        });

      // Token
      const token =
        jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Login
export const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // Find User
      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid credentials",
        });
      }

      // Compare Password
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid credentials",
        });
      }

      // Token
      const token =
        jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };