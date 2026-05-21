import express from "express";

import {
  createCoupon,
  applyCoupon,
  getCoupons,
  deleteCoupon,
} from "../controllers/couponController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// APPLY COUPON
router.post(
  "/apply",
  applyCoupon
);


// ADMIN CREATE COUPON
router.post(
  "/",
  protect,
  adminOnly,
  createCoupon
);


// ADMIN GET COUPONS
router.get(
  "/",
  protect,
  adminOnly,
  getCoupons
);


// ADMIN DELETE COUPON
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCoupon
);

export default router;