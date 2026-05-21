import mongoose from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      orderItems: [
        {
          name: String,
          qty: Number,
          image: String,
          price: Number,
          product: {
            type:
              mongoose.Schema
                .Types
                .ObjectId,
            ref: "Product",
          },
        },
      ],

      shippingInfo: {
        name: String,
        email: String,
        address: String,
        city: String,
        country: String,
      },

      paymentMethod: {
        type: String,
        default:
          "Cash On Delivery",
      },

      totalPrice: {
        type: Number,
        required: true,
      },

      isDelivered: {
        type: Boolean,
        default: false,
      },

      deliveredAt: Date,
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;