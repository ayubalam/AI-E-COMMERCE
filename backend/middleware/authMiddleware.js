import jwt from "jsonwebtoken";

import User from "../models/User.js";

// ===============================
// PROTECT ROUTE
// ===============================
export const protect =
  async (req, res, next) => {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      try {

        // GET TOKEN
        token =
          req.headers.authorization.split(
            " "
          )[1];

        // VERIFY TOKEN
        const decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );

        console.log(decoded);

        // FIND USER
        req.user =
          await User.findById(
            decoded.id ||
            decoded._id
          ).select("-password");

        // USER NOT FOUND
        if (!req.user) {

          return res.status(401).json({
            success: false,
            message:
              "User not found",
          });
        }

        next();

      } catch (error) {

        console.log(
          "AUTH ERROR ❌"
        );

        console.log(error);

        return res.status(401).json({
          success: false,
          message:
            "Token failed",
        });
      }
    }

    // NO TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Not authorized",
      });
    }
  };

// ===============================
// ADMIN ONLY
// ===============================
export const adminOnly =
  (req, res, next) => {

    if (
      req.user &&
      req.user.role === "admin"
    ) {

      next();

    } else {

      return res.status(403).json({
        success: false,
        message:
          "Admin access only",
      });
    }
  };