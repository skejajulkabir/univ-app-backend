const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);

module.exports = OtpVerification;
