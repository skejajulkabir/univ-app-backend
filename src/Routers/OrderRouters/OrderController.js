//? Importing Models======================================================
const { default: axios } = require("axios");
const Order = require("../../models/OrderModel");
const Product = require("../../models/product");

//? Handlers==============================================================

const addOrderController = async (req, res) => {
  const orderCredentials = {
    totalOrderPrice: 0,
  };

  try {
    const o = req.body;

    const { customer, cart, totalOrderValue, status } = o;

    //? refactoring old code to make it more efficient.=========

    //! setting the price from backend...
    for (let index = 0; index < cart.length; index++) {
      const prd = await Product.findOne({ _id: cart[index].id });

      let productVariant = prd.variants.find((vrnt) => {
        return cart[index].color === vrnt.color;
      });

      //! setting the price...
      orderCredentials.totalOrderPrice =
        orderCredentials.totalOrderPrice +
        cart[index].qty * productVariant.price;
    }

    if (orderCredentials.totalOrderPrice !== parseInt(totalOrderValue)) {
      res
        .status(409)
        .json({
          message:
            "There is some problem with the orderprice. Please try again...",
        });
    }

    // console.log("totalordrvalue frm frntend.", totalOrderValue);

    const ordr = new Order({
      customer,
      cart,
      totalOrderValue: orderCredentials.totalOrderPrice,
      status,
    });

    const savedOrder = await ordr.save();

    //? proceed to pay...

    await axios
      .get(`${process.env.backendURL}/payment/init`, {
        data: {
          total_amount:
            parseInt(orderCredentials.totalOrderPrice) +
            parseInt(process.env.DELIVERY_CHARGE),
          currency: "BDT",
          tran_id: savedOrder._id,
          product_name: savedOrder.cart[0].name,
          product_category: "Clothing", //? Hadrcoded category...
          product_profile: "general",
          cus_name: savedOrder.customer.fullName,
          cus_email: savedOrder.customer.email,
          cus_add1: "JASHORE", //! Hardcoded cus_add1
          cus_add2: "JASHORE", //! Hardcoded cus_add2
          cus_city: "JASHORE", //! Hardcoded cus_city
          cus_state: "JASHORE", //! Hardcoded cus_state
          cus_postcode: "7407", //? PostCode of JASHORE
          cus_country: "Bangladesh",
          cus_phone: savedOrder.customer.phone,
          cus_fax: "",
          ship_name: savedOrder.customer.fullName,
          ship_add1: "JASHORE", //! Hardcoded ship_add1
          ship_add2: "JASHORE", //! Hardcoded ship_add2
          ship_city: "JASHORE", //! Hardcoded ship_city
          ship_state: "JASHORE", //! Hardcoded ship_state
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        },
      })
      .then((resp) => {
        res.status(200).json({
          message: "The order has been received successfully...",
          newOrder: savedOrder,
          paymentData: resp.data.apiResponse,
          config: resp.config,
        });
      });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add order to the DB.", error });
  }
};

module.exports = { addOrderController };
