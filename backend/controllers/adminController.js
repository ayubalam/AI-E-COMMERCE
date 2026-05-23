import User from "../models/User.js";

import Product from "../models/Product.js";

import Order from "../models/Order.js";

// ADMIN DASHBOARD
export const getAdminStats =
  async (req, res) => {

    try {

      // TOTAL USERS
      const users =
        await User.countDocuments();

      // TOTAL PRODUCTS
      const products =
        await Product.countDocuments();

      // TOTAL ORDERS
      const orders =
        await Order.countDocuments();

      // TOTAL REVENUE
      const allOrders =
        await Order.find();

      const revenue =
        allOrders.reduce(
          (acc, item) =>
            acc +
            item.totalPrice,
          0
        );

      // RECENT ORDERS
      const recentOrders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json({

        success: true,

        stats: {

          users,

          products,

          orders,

          revenue,
        },

        recentOrders,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };