import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const protect =
  async (req, res, next) => {

    try {

      let token;

      // Check Authorization Header
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {

        token =
          req.headers.authorization.split(
            " "
          )[1];

        // Verify Token
        const decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );

        // Get User
        req.user =
          await User.findById(
            decoded.id
          ).select("-password");

        next();

      } else {

        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

    } catch (error) {

      return res.status(401).json({
        message:
          "Token failed",
      });
    }
  };