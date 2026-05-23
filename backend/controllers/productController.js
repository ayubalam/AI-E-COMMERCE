import Product from "../models/Product.js";


// CREATE PRODUCT
export const createProduct =
  async (req, res) => {

    try {

      const product =
        await Product.create(
          req.body
        );

      res.status(201).json({
        success: true,
        product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// GET ALL PRODUCTS
export const getProducts =
  async (req, res) => {

    try {

      const keyword =
        req.query.keyword
          ? {
              name: {
                $regex:
                  req.query.keyword,
                $options: "i",
              },
            }
          : {};

      const category =
        req.query.category
          ? {
              category:
                req.query.category,
            }
          : {};

      // PRICE FILTER
      let priceFilter = {};

      if (
        req.query.minPrice &&
        req.query.maxPrice
      ) {

        priceFilter = {

          price: {

            $gte:
              Number(
                req.query.minPrice
              ),

            $lte:
              Number(
                req.query.maxPrice
              ),
          },
        };
      }

      // SORTING
      let sortOption = {};

      if (
        req.query.sort ===
        "low-high"
      ) {

        sortOption = {
          price: 1,
        };

      } else if (
        req.query.sort ===
        "high-low"
      ) {

        sortOption = {
          price: -1,
        };

      } else if (
        req.query.sort ===
        "latest"
      ) {

        sortOption = {
          createdAt: -1,
        };
      }

      const products =
        await Product.find({

          ...keyword,

          ...category,

          ...priceFilter,
        }).sort(
          sortOption
        );

      res.json({

        success: true,

        products,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

  // AI RECOMMENDED PRODUCTS
export const getRecommendedProducts =
  async (req, res) => {

    try {

      // TOP RATED PRODUCTS
      const recommended =
        await Product.find({

          rating: {
            $gte: 3,
          },

          stock: {
            $gt: 0,
          },
        })

        .sort({

          rating: -1,

          numReviews: -1,
        })

        .limit(8);

      res.json({

        success: true,

        products:
          recommended,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };


// GET SINGLE PRODUCT
export const getProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      res.json({
        success: true,
        product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// CREATE REVIEW
export const createReview =
  async (req, res) => {

    try {

      const {
        rating,
        comment,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      // CHECK EXISTING REVIEW
      const alreadyReviewed =
        product.reviews.find(
          (review) =>
            review.user.toString() ===
            req.user._id.toString()
        );

      if (alreadyReviewed) {

        return res.status(400).json({
          success: false,
          message:
            "Product already reviewed",
        });
      }

      // NEW REVIEW
      const review = {

        name:
          req.user.name,

        rating:
          Number(rating),

        comment,

        user:
          req.user._id,
      };

      // PUSH REVIEW
      product.reviews.push(
        review
      );

      // TOTAL REVIEWS
      product.numReviews =
        product.reviews.length;

      // AVERAGE RATING
      product.rating =
        product.reviews.reduce(
          (acc, item) =>
            item.rating + acc,
          0
        ) /
        product.reviews.length;

      await product.save();

      res.status(201).json({
        success: true,
        message:
          "Review Added",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// UPDATE PRODUCT
export const updateProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });
      }

      const updated =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        product: updated,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// DELETE PRODUCT
export const deleteProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      await product.deleteOne();

      res.json({
        success: true,
        message:
          "Product deleted successfully",
      });

    } catch (error) {4

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };