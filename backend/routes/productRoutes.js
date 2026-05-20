import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// PUBLIC
router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProduct
);


// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;