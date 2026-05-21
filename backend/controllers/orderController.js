import Order from "../models/Order.js";

// CREATE ORDER
export const createOrder =
  async (req, res) => {

    try {

      const {
        orderItems,
        shippingInfo,
        paymentMethod,
        totalPrice,
      } = req.body;

      const order =
        await Order.create({
          user:
            req.user._id,
          orderItems,
          shippingInfo,
          paymentMethod,
          totalPrice,
        });

      res.status(201).json({
        success: true,
        order,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET MY ORDERS
export const getMyOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find({
          user:
            req.user._id,
        });

      res.json({
        success: true,
        orders,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };