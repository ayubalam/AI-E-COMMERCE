import Product from "../models/Product.js";

// CREATE PRODUCT
export const createProduct =
  async (req, res) => {

    try {

      const {
        name,
        price,
        category,
        image,
        description,
      } = req.body;

      const product =
        await Product.create({
          name,
          price,
          category,
          image,
          description,
          createdBy:
            req.user._id,
        });

      res.status(201).json({
        success: true,
        product,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET PRODUCTS
export const getProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find();

      res.status(200).json({
        success: true,
        products,
      });

    } catch (error) {

      res.status(500).json({
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
          message:
            "Product not found",
        });
      }

      await product.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Product deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };