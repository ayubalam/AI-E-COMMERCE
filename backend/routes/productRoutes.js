import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET PRODUCTS
router.get(
  "/",
  getProducts
);

// CREATE PRODUCT
router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;