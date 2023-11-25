// importing libraries
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// importing models
const Donor = require("../../models/donorModel");

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
    fileSize: 3 * 1024 * 1024, // 5 megabyte (in bytes)
  },
}).single("avatar");

const addDonationController = async (req, res) => {
  try {
    // Uploading image of the donor
    upload(req, res, async (err) => {


      const data = req.body;

      const { donorName, donorIdentity, donorPhoneNumber, donorAddress, donorDescriptions, DonationAmount } = data;



      const newDonor = new Donor({
        name : donorName,
        identity : donorIdentity,
        phone : donorPhoneNumber,
        address : donorAddress,
        desc : donorDescriptions,
        amount : DonationAmount,
      });


      if (err) {
        console.error("Error uploading avatar:", err);
        return res.status(500).json({ error: "Failed to upload avatar", err });
      }

      if (req.file) {
        // Save avatar URL in the donor document
        newDonor.img = `${process.env.backendURL}/static/uploads/donorPhotos/${req.file.filename}`;
      }

      // Save donor data in the database
      await newDonor.save();

      res.status(200).json({ message: "Donation added successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addDonationController,
};
