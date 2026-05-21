import Coupon from "../models/Coupon.js";


// CREATE COUPON (ADMIN)
export const createCoupon =
  async (req, res) => {

    try {

      const {
        code,
        discountType,
        discountValue,
        minAmount,
        expiryDate,
      } = req.body;

      // CHECK EXISTING
      const existingCoupon =
        await Coupon.findOne({
          code:
            code.toUpperCase(),
        });

      if (
        existingCoupon
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Coupon already exists",
        });
      }

      // CREATE
      const coupon =
        await Coupon.create({

          code:
            code.toUpperCase(),

          discountType,

          discountValue,

          minAmount,

          expiryDate,
        });

      res.status(201).json({
        success: true,
        coupon,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// APPLY COUPON
export const applyCoupon =
  async (req, res) => {

    try {

      const {
        code,
        totalAmount,
      } = req.body;

      // FIND COUPON
      const coupon =
        await Coupon.findOne({

          code:
            code.toUpperCase(),

          isActive: true,
        });

      // NOT FOUND
      if (!coupon) {

        return res.status(404).json({
          success: false,
          message:
            "Invalid coupon code",
        });
      }

      // EXPIRED
      if (
        new Date() >
        new Date(
          coupon.expiryDate
        )
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Coupon expired",
        });
      }

      // MINIMUM AMOUNT
      if (
        totalAmount <
        coupon.minAmount
      ) {

        return res.status(400).json({
          success: false,
          message:
            `Minimum order amount is ₹${coupon.minAmount}`,
        });
      }

      // CALCULATE DISCOUNT
      let discount = 0;

      if (
        coupon.discountType ===
        "percentage"
      ) {

        discount =
          (totalAmount *
            coupon.discountValue) /
          100;

      } else {

        discount =
          coupon.discountValue;
      }

      // FINAL PRICE
      const finalAmount =
        totalAmount -
        discount;

      res.json({
        success: true,

        couponCode:
          coupon.code,

        discount,

        finalAmount,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// GET ALL COUPONS (ADMIN)
export const getCoupons =
  async (req, res) => {

    try {

      const coupons =
        await Coupon.find()
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        coupons,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// DELETE COUPON (ADMIN)
export const deleteCoupon =
  async (req, res) => {

    try {

      const coupon =
        await Coupon.findById(
          req.params.id
        );

      if (!coupon) {

        return res.status(404).json({
          success: false,
          message:
            "Coupon not found",
        });
      }

      await coupon.deleteOne();

      res.json({
        success: true,
        message:
          "Coupon deleted",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };