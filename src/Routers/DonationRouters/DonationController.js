// importing libraries
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// importing models
const Donor = require("../../models/donorModel");
// const Order = require("../../models/OrderModel");
const User = require("../../models/userModel");

//?update avatar

const uploadDir = path.join(__dirname, "../../public/uploads");
const avatarDir = path.join(uploadDir, "donorPhotos");

// Create parent directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create avatars directory if it doesn't exist
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir);
    }
    cb(null, avatarDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "donorAvatar-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 megabyte (in bytes)
  },
}).single("avatar");

const addDonationController = (req, res) => {

  console.log(req.body)

  const requestBody = req.body;









  //!  Uploading image of the donor SEGMENT
  //!  Uploading image of the donor SEGMENT
  //!  Uploading image of the donor SEGMENT

  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading avatar:", err);
      return res.status(500).json({ error: "Failed to upload avatar", err });
    }

    try {
      const userId = req.params.uID;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.file) {
        if (user.avatar) {
          try {
            const avtrName = user.avatar.split("/")[6];
            fs.unlinkSync(`${avatarDir}/${avtrName}`);
          } catch (error) {
            console.log(error);
          }
        }

        // Update the avatar field in the user document
        user.avatar = `${process.env.backendURL}/static/uploads/donorPhotos/${req.file.filename}`;
        await user.save();

        return res.status(200).json({
          message: "Avatar updated successfully",
          avatarURL: user.avatar,
        });
      } else {
        return res.status(400).json({ error: "No avatar file provided" });
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      return res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  });
};

module.exports = {
  addDonationController,
};
