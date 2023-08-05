// importing libraries
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

//importing models
const OtpVerification = require("../../models/OtpVarificationModel");

// Function to generate OTP
const generateOTP = () => {
  // Generate a random 6-digit OTP
  //   return Math.floor(Math.random() * 900000) + 100000;

  return Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
};

const sendOTPhandler = async (req, res) => {
  const { userEmail , users_id } = req.body;

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
            user: users_id,
            otp,
            expiry: otpExpiry,
          });
          await otpVerification.save();
    } catch (error) {
        console.error({msg : "could not save the otp to the db.",error});
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












module.exports = { sendOTPhandler };




// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

// const sendOTPhandler = (req, res) => {

//     const { userEmail } = req.body;

//     let config = {
//         service : 'gmail',
//         auth : {
//             user: process.env.EMAIL_ADDRESS,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     }

//     let transporter = nodemailer.createTransport(config);

//     let MailGenerator = new Mailgen({
//         theme: "default",
//         product : {
//             name: "SK EJAJUL KABIR",
//             link : 'https://mailgen.js/'
//         }
//     })

//     let response = {
//         body: {
//             name : userEmail,
//             intro: `You have an OTP request and the OTP is, ${Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111}`,
//             outro: "Looking forward to do more business"
//         }
//     }

//     let mail = MailGenerator.generate(response)

//     let message = {
//         from : process.env.EMAIL_ADDRESS,
//         to : userEmail,
//         subject: "Varify your email address in JUSTIAN.XYZ",
//         html: mail
//     }

//     transporter.sendMail(message).then((r) => {
//         return res.status(201).json({
//             msg: "you should receive an email",
//             r
//         })
//     }).catch(error => {
//         return res.status(500).json({ error })
//     })

//     // res.status(201).json("getBill Successfully...!");
// }
