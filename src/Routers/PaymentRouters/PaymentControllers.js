// importing libraries
const SSLCommerzPayment = require("sslcommerz-lts");

//importing models
const Order = require("../../models/OrderModel");
const availableTshirtSize = require("../../models/availableTshirtSize");
// const User = require("../../models/userModel");

//? declaring variables
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

//sslcommerz init
const initiate_SSL_Payment = (req, res) => {
  const requestData = req.body;
  console.log(requestData)

  const data = {
    total_amount: requestData.total_amount,
    currency: requestData.currency,
    tran_id: requestData.tran_id,
    success_url: `${process.env.backendURL}/payment/success/${requestData.tran_id}`, //? Not coming from frontend...
    fail_url: `${process.env.backendURL}/payment/failed/${requestData.tran_id}`, //? Not coming from frontend...
    cancel_url: `${process.env.backendURL}/payment/cancelled/${requestData.tran_id}`, //? Not coming from frontend...
    ipn_url: `${process.env.backendURL}/payment/ipn/${requestData.tran_id}`, //? Not coming from frontend...(IPN = Instant Payment Notification...)
    shipping_method: "Courier", //? //? Not coming from frontend...
    product_name: requestData.product_name,
    product_category: requestData.product_category,
    product_profile: requestData.product_profile,
    cus_name: requestData.cus_name,
    cus_email: requestData.cus_email,
    cus_add1: requestData.cus_add1,
    cus_add2: requestData.cus_add2,
    cus_city: requestData.cus_city,
    cus_state: requestData.cus_state,
    cus_postcode: requestData.cus_postcode,
    cus_country: requestData.cus_country,
    cus_phone: requestData.cus_phone,
    cus_fax: requestData.cus_fax,
    ship_name: requestData.ship_name,
    ship_add1: requestData.ship_add1,
    ship_add2: requestData.ship_add2,
    ship_city: requestData.ship_city,
    ship_state: requestData.ship_state,
    ship_postcode: requestData.ship_postcode,
    ship_country: requestData.ship_country,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ apiResponse });
  });
};

const validatePaymentController = (req, res) => {
  const val_id = req.body.val_id;

  const data = {
    val_id: val_id, //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.validate(data).then((data) => {
    res.json({ data });
  });
};



const paymentSuccessController = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Collect all unique color and size combinations from the order
    const uniqueTshirtSizes = [...new Set(order.cart.map(item => ({ color: item.color, size: item.size })))];

    try {
      for (const tshirtSizeInfo of uniqueTshirtSizes) {
        const tshirtSize = await availableTshirtSize.findOne(
          { name: tshirtSizeInfo.color }
        );

        const index = tshirtSize.data.findIndex(
          (item) => item.size === tshirtSizeInfo.size
        );

        if (index !== -1) {
          const orderItems = order.cart.filter(item => item.color === tshirtSizeInfo.color && item.size === tshirtSizeInfo.size);
          const totalOrderedQuantity = orderItems.reduce((total, item) => total + item.qty, 0);
          const updatedQuantity = parseInt(tshirtSize.data[index].quantity, 10) - totalOrderedQuantity;

          await availableTshirtSize.updateOne(
            { _id: tshirtSize._id, 'data.size': tshirtSizeInfo.size },
            { $set: { 'data.$.quantity': updatedQuantity } }
          );
        }
      }
    } catch (error) {
      console.error("Error updating available T-shirt sizes:", error);
    }

    return res.redirect(`${process.env.frontendURL}/payment/success`);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};







const paymentfailedController = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);


    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.redirect(`${process.env.frontendURL}/payment/failed`);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const paymentCancelledController = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);


    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.redirect(`${process.env.frontendURL}/payment/failed`);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



//? <================== donation segment =================>
//? <================== donation segment =================>
//? <================== donation segment =================>


const initiate_SSL_DONATION = (req, res) => {
  const requestData = req.body;

  const data = {
    total_amount: requestData.total_amount,
    currency: requestData.currency,
    tran_id: requestData.tran_id,
    success_url: `${process.env.backendURL}/donation/success/${requestData.tran_id}`, //? Not coming from frontend...
    fail_url: `${process.env.backendURL}/donation/failed/${requestData.tran_id}`, //? Not coming from frontend...
    cancel_url: `${process.env.backendURL}/donation/cancelled/${requestData.tran_id}`, //? Not coming from frontend...
    ipn_url: `${process.env.backendURL}/donation/ipn/${requestData.tran_id}`, //? Not coming from frontend...(IPN = Instant Payment Notification...)
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




module.exports = {
  initiate_SSL_Payment,
  initiate_SSL_DONATION,
  validatePaymentController,
  paymentSuccessController,
  paymentfailedController,
  paymentCancelledController
};
