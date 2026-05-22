import express from "express";

import {

  createProduct,

  getProducts,

  getProduct,

  deleteProduct,

  updateProduct,

  createReview,

} from "../controllers/productController.js";

import {

  protect,

  adminOnly,

} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

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

// REVIEW
router.post(
  "/:id/review",
  protect,
  createReview
);

// IMAGE UPLOAD
router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("image"),
  (req, res) => {

    res.json({
      success: true,

      image:
        req.file.path,
    });
  }
);

// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;