// importing libraries
const SSLCommerzPayment = require('sslcommerz-lts')

//importing models
// const User = require("../../models/userModel");


//? declaring variables
const store_id = "abc6533752d771c4"
const store_passwd = "abc6533752d771c4@ssl"
const is_live = false //true for live, false for sandbox

//sslcommerz init
const sslInit =  (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: `${process.env.frontendURL}/success`,
        fail_url: `${process.env.frontendURL}/fail`,
        cancel_url: `${process.env.frontendURL}/cancel`,
        ipn_url: `${process.env.frontendURL}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
  
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse) => {
        console.log(apiResponse)
      // Redirect the user to the payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({GatewayPageURL});
    });
  };



module.exports = { sslInit };
