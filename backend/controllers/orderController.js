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

  isPaid,

  paidAt,

  paymentResult,

} = req.body;

     const order =
  await Order.create({

    user:
      req.user._id,

    orderItems,

    shippingInfo,

    paymentMethod,

    totalPrice,

    isPaid,

    paidAt,

    paymentResult,
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

// GET ALL ORDERS (ADMIN)
export const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          );

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

// MARK DELIVERED
export const markDelivered =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      order.isDelivered =
        true;

      order.deliveredAt =
        Date.now();

      await order.save();

      res.json({
        success: true,
        message:
          "Order Delivered",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };