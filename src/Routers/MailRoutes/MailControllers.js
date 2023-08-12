// importing libraries
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const CryptoJS = require("crypto-js");

//importing models
const OtpVerification = require("../../models/OtpVarificationModel");
const User = require("../../models/userModel");

// Function to generate OTP
const generateOTP = () => {
  // Generate a random 6-digit OTP
  //   return Math.floor(Math.random() * 900000) + 100000;

  return Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
};

const sendOTPhandler = async (req, res) => {
  const { userEmail, regularEmail, users_id } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "SK EJAJUL KABIR",
      link: "https://www.facebook.com/ajajul.kabir.7",
    },
  });

  try {
    // Generate OTP and its expiry
    const otp = generateOTP();
    const OTP_EXPIRY_DURATION = 10 * 60 * 1000; // 10 minutes (adjust as per your requirements)
    const otpExpiry = new Date(Date.now() + OTP_EXPIRY_DURATION);

    // Save OTP and its expiry in the OTP verification model
    try {
      const otpVerification = new OtpVerification({
        regularEmail,
        user: users_id,
        mail: userEmail,
        otp,
        expiry: otpExpiry,
      });
      await otpVerification.save();
    } catch (error) {
      console.error({ msg: "could not save the otp to the db.", error });
    }

    let response = {
      body: {
        name: userEmail,
        intro: `You have an OTP request and the OTP is, ${otp}`,
        outro: "Looking forward to do more business",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: "Varify your email address in JUSTIAN.XYZ",
      html: mail,
    };

    await transporter.sendMail(message);

    return res.status(201).json({
      msg: "You should receive an email with the OTP.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Error sending OTP via email." });
  }
};

const verifyOTPhandler = async (req, res) => {
  const { userID, otp } = req.body;

  try {
    // Find the OTP verification entry for the user
    const otpVerification = await OtpVerification.findOne({ user: userID });

    if (!otpVerification) {
      return res
        .status(404)
        .json({ error: "OTP verification entry not found." });
    }

    // Check if the OTP provided by the user matches the stored OTP
    if (otpVerification.otp !== parseInt(otp)) {
      await OtpVerification.deleteOne({ user: userID });
      return res.status(400).json({ error: "Invalid OTP." });
    }

    // Check if the OTP has expired
    const currentTime = new Date();
    if (currentTime > otpVerification.expiry) {
      // OTP has expired
      await OtpVerification.deleteOne({ user: userID });
      return res
        .status(400)
        .json({ error: "OTP has expired. Please request a new OTP." });
    }

    // Mark the user as verified
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { isVarified: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the OTP verification entry from the database as it is no longer needed
    await OtpVerification.deleteOne({ user: userID });

    return res.status(200).json({ msg: "Email verified successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error verifying OTP." });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { regularEmail } = req.body;

    const user = await User.findOne({ regularEmail: regularEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a OTP
    const newPassword = generateOTP();

    const newPasswordString = newPassword.toString();

    const encryptedNewPassword = CryptoJS.AES.encrypt(newPasswordString,"secret key 123").toString();

    console.log(newPasswordString);

    // Update the user's password with the new encrypted password
    user.password = encryptedNewPassword;

    await user.save();

    // Sending the reset token via email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "JUSTIAN.XYZ",
        link: "https://www.example.com",
      },
    });

    let mail = {
      body: {
        name: user.name,
        intro: `You have a reset password request, and the password is, ${newPasswordString}`,
        outro: "Looking forward to do more business",
      },
    };

    const emailBody = MailGenerator.generate(mail);

    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: user.regularEmail,
      subject: "Password Reset Request",
      html: emailBody,
    };

    await transporter.sendMail(message);

    return res
      .status(200)
      .json({
        message:
          "Password reset successful. Check your email for the new password.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not reset password", error });
  }
};

module.exports = { sendOTPhandler, verifyOTPhandler, forgotPasswordController };
