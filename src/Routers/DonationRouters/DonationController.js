// importing libraries
const SSLCommerzPayment = require("sslcommerz-lts");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// importing models
const Donor = require("../../models/donorModel");


//? declaring variables
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

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






const addDonationController = async (req, res) => {
  try {
    // Uploading image of the donor
    upload(req, res, async (err) => {
      const data = req.body;

      const {
        donorName,
        donorIdentity,
        donorEmail,
        donorPhoneNumber,
        donorAddress,
        donorDescriptions,
        DonationAmount,
      } = data;

      const newDonor = new Donor({
        name: donorName,
        identity: donorIdentity,
        phone: donorPhoneNumber,
        email: donorEmail,
        address: donorAddress,
        desc: donorDescriptions,
        amount: DonationAmount,
      });

      if (err) {
        console.error("Error uploading avatar:", err);
        return res
          .status(500)
          .json({ error: "Failed to upload avatar", err });
      }

      if (req.file) {
        // Save avatar URL in the donor document
        newDonor.img = `${process.env.backendURL}/static/uploads/donorPhotos/${req.file.filename}`;
      }

      // Save donor data in the database
      const savedDonation = await newDonor.save();

      // Proceed to pay...

      await axios
        .get(`${process.env.backendURL}/donate/init`, {
          data: {
                  total_amount: parseInt(DonationAmount),
                  currency: "BDT",
                  tran_id: savedDonation._id,
                  product_name: savedDonation.name,
                  product_category: "DONATION", //? Hadrcoded category...
                  product_profile: "DONATION",
                  cus_name: savedDonation.name,
                  cus_email: savedDonation.email || "" ,
                  cus_add1: "JASHORE", //! Hardcoded cus_add1
                  cus_add2: "JASHORE", //! Hardcoded cus_add2
                  cus_city: "JASHORE", //! Hardcoded cus_city
                  cus_state: "JASHORE", //! Hardcoded cus_state
                  cus_postcode: "7407", //? PostCode of JASHORE
                  cus_country: "Bangladesh",
                  cus_phone: donorPhoneNumber,
                  cus_fax: "",
                  ship_name: "DONATION",
                  ship_add1: "JASHORE", //! Hardcoded ship_add1
                  ship_add2: "JASHORE", //! Hardcoded ship_add2
                  ship_city: "JASHORE", //! Hardcoded ship_city
                  ship_state: "JASHORE", //! Hardcoded ship_state
                  ship_postcode: 1000,
                  ship_country: "Bangladesh",
                },
        })
        .then((resp) => {
          // console.log(resp.data.apiResponse.GatewayPageURL)
          return res.status(200).json({
            message: "The informations are received successfully... Please clear the payment now...",
            newDonation: savedDonation,
            donationData: resp.data.apiResponse,
            config: resp.config,
          });
        })
        .catch((error) => {
          console.error("Error initiating donation:", error);
          return res.status(500).json({ error: "Internal server error" });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};





const initiate_SSL_DONATION = (req, res) => {
  const requestData = req.body;

  const data = {
    total_amount: requestData.total_amount,
    currency: requestData.currency,
    tran_id: requestData.tran_id,
    success_url: `${process.env.backendURL}/donate/success/${requestData.tran_id}`, //? Not coming from frontend...
    fail_url: `${process.env.backendURL}/donate/failed/${requestData.tran_id}`, //? Not coming from frontend...
    cancel_url: `${process.env.backendURL}/donate/cancelled/${requestData.tran_id}`, //? Not coming from frontend...
    ipn_url: `${process.env.backendURL}/donate/ipn/${requestData.tran_id}`, //? Not coming from frontend...(IPN = Instant Payment Notification...)
    shipping_method: "Courier", //? //? Not coming from frontend...
    product_name: "ITS A DONATION...",//? //? Not coming from frontend...
    product_category: "ITS A DONATION...",//? //? Not coming from frontend...
    product_profile: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_name: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_email: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_add1: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_add2: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_city: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_state: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_postcode: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_country: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_phone: "ITS A DONATION...",//? //? Not coming from frontend...
    cus_fax: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_name: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_add1: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_add2: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_city: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_state: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_postcode: "ITS A DONATION...",//? //? Not coming from frontend...
    ship_country: "ITS A DONATION...",//? //? Not coming from frontend...
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ apiResponse });
  });
};






const donationSuccessController = async (req, res) => {
  console.log("donate success...")
  try {
    const donation = await Donor.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }


    return res.redirect(`${process.env.frontendURL}/donate/success/donation/${donation._id}`);


  } catch (error) {
    console.error("Error updating donation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};






const donationFailedController = async (req, res) => {
  try {
    const donation = await Donor.findByIdAndDelete(req.params.id);


    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    return res.redirect(`${process.env.frontendURL}/donation/failed`);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};





const donationCancelledController = async (req, res) => {
  try {
    const donation = await Donor.findByIdAndDelete(req.params.id);


    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    return res.redirect(`${process.env.frontendURL}/donation/failed`);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  addDonationController,
  initiate_SSL_DONATION,
  donationSuccessController,
  donationFailedController,
  donationCancelledController
};