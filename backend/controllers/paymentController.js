import Razorpay from "razorpay";

import crypto from "crypto";

// CREATE ORDER
export const createRazorpayOrder =
  async (req, res) => {

    try {

      const razorpay =
        new Razorpay({
          key_id:
            process.env
              .RAZORPAY_KEY_ID,

          key_secret:
            process.env
              .RAZORPAY_KEY_SECRET,
        });

      const {
        amount,
      } = req.body;

      const options = {

        amount:
          amount * 100,

        currency:
          "INR",

        receipt:
          `receipt_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// VERIFY PAYMENT
export const verifyPayment =
  async (req, res) => {

    try {

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,
      } = req.body;

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",

            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(body.toString())
          .digest("hex");

      const isAuthentic =
        expectedSignature ===
        razorpay_signature;

      if (isAuthentic) {

        res.json({
          success: true,
          message:
            "Payment Verified",
        });

      } else {

        res.status(400).json({
          success: false,
          message:
            "Invalid Signature",
        });
      }

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };