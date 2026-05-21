import express from "express";

import {
  createOrder,
  getMyOrders,
} from "../controllers/orderController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);

// MY ORDERS
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

export default router;