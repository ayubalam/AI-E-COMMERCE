import Product from "../models/Product.js";
import Order from "../models/Order.js";

import sendSMS from "../utils/sendSMS.js";

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

      // CHECK STOCK
      for (
        const item of orderItems
      ) {

        const product =
          await Product.findById(
            item.product ||
            item._id
          );

        // PRODUCT NOT FOUND
        if (!product) {

          return res.status(404).json({
            success: false,
            message:
              "Product not found",
          });
        }

        // OUT OF STOCK
        if (
          product.stock <
          item.qty
        ) {

          return res.status(400).json({
            success: false,
            message:
              `${product.name} is out of stock`,
          });
        }
      }

      // CREATE ORDER
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

      // UPDATE STOCK
      for (
        const item of orderItems
      ) {

        const product =
          await Product.findById(
            item.product ||
            item._id
          );

        if (product) {

          product.stock =
            product.stock -
            item.qty;

          await product.save();
        }
      }

      // SEND SMS
      if (
        shippingInfo.phone
      ) {

        await sendSMS(

          shippingInfo.phone,

          `Hello ${shippingInfo.name},

Your order has been placed successfully.

Amount: Rs ${totalPrice}

Payment Method: ${paymentMethod}

Thank you for shopping with AI Smart Commerce.`
        );
      }

      res.status(201).json({
        success: true,
        order,
      });

    } catch (error) {

      console.log(
        "ORDER ERROR "
      );

      console.log(error);

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

// USER DASHBOARD STATS
export const getUserDashboardStats =
  async (req, res) => {

    try {

      console.log(
        "LOGGED USER:",
        req.user
      );

      // GET USER ORDERS
      const orders =
        await Order.find({

          user:
            req.user._id,
        });

      console.log(
        "ORDERS:",
        orders
      );

      // TOTAL ORDERS
      const totalOrders =
        orders.length;

      // TOTAL SPENT
      const totalSpent =
        orders.reduce(
          (acc, item) =>
            acc +
            item.totalPrice,
          0
        );

      // RECENT ORDERS
      const recentOrders =
        orders
          .sort(
            (a, b) =>
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
          )
          .slice(0, 5);

      res.json({

        success: true,

        totalOrders,

        totalSpent,

        recentOrders,
      });

    } catch (error) {

      console.log(error);

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

// UPDATE ORDER STATUS
export const updateOrderStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      // UPDATE STATUS
      order.orderStatus =
        req.body.status;

      order.trackingNumber =
        req.body.trackingNumber ||
        order.trackingNumber;

      order.courierService =
        req.body.courierService ||
        order.courierService;

      // DELIVERED
      if (
        req.body.status ===
        "Delivered"
      ) {

        order.isDelivered =
          true;

        order.deliveredAt =
          Date.now();
      }

      await order.save();

      res.json({
        success: true,
        message:
          "Order Status Updated",
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

      order.orderStatus =
        "Delivered";

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