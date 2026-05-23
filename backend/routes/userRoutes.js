import express from "express";

import {
  uploadProfilePic,
} from "../controllers/userController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

// UPLOAD PROFILE PICTURE
router.put(
  "/upload-avatar",
  protect,
  upload.single("avatar"),
  uploadProfilePic
);

export default router;