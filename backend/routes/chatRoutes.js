import express from "express";

import {
  chatbot,
} from "../controllers/chatController.js";

const router =
  express.Router();

// AI CHAT
router.post(
  "/",
  chatbot
);

export default router;