import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  getAdminStats,
} from "../controllers/authController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// PROFILE
router.get(
  "/profile",
  protect,
  getProfile
);

// ADMIN ANALYTICS
router.get(
  "/admin/stats",
  protect,
  adminOnly,
  getAdminStats
);

export default router;