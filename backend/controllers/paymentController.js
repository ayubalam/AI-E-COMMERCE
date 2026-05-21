import Razorpay from "razorpay";

// CREATE ORDER
export const createRazorpayOrder =
  async (req, res) => {

    try {

      // RAZORPAY INSTANCE
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

      // CREATE ORDER
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