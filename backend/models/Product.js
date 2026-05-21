import mongoose from "mongoose";

const reviewSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      name: {
        type: String,
      },

      rating: {
        type: Number,

        required: true,
      },

      comment: {
        type: String,

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      stock: {
        type: Number,
        default: 1,
      },

      // REVIEWS
      reviews: [
        reviewSchema,
      ],

      // AVERAGE RATING
      rating: {
        type: Number,
        default: 0,
      },

      // TOTAL REVIEWS
      numReviews: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const Product =
  mongoose.model(
    "Product",
    productSchema
  );

export default Product;