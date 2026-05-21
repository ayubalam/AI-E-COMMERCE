import express from "express";

import {

  createRazorpayOrder,

  verifyPayment,

} from "../controllers/paymentController.js";

const router =
  express.Router();

// CREATE ORDER
router.post(
  "/create-order",
  createRazorpayOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  verifyPayment
);

export default router;