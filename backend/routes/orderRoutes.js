import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  markDelivered,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  adminOnly,
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

// ADMIN ALL ORDERS
router.get(
  "/admin",
  protect,
  adminOnly,
  getAllOrders
);

// UPDATE STATUS
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

// MARK DELIVERED
router.put(
  "/:id/deliver",
  protect,
  adminOnly,
  markDelivered
);

export default router;