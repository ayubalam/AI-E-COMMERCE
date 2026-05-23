import User from "../models/User.js";

// UPDATE PROFILE IMAGE
export const uploadProfilePic =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",
        });
      }

      // SAVE CLOUDINARY IMAGE URL
      user.avatar =
        req.file.path;

      await user.save();

      res.json({

        success: true,

        message:
          "Profile picture uploaded successfully",

        avatar:
          user.avatar,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };