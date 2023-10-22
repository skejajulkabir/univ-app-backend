//? Importing Models======================================================
const Order = require("../../models/OrderModel");
const Product = require("../../models/product");

//? Handlers==============================================================

const addOrderController = async (req, res) => {

  const orderCredentials ={
    totalOrderPrice : 0
  }
  try {
    const o = req.body;

    // console.log(o)

    const { customer, cart, totalOrderValue, status } = o;

    //? refactoring old code to make it more efficient.=========


    for (let index = 0; index < cart.length; index++) {
      const prd = await Product.findOne({ _id: cart[index].id });
  
      let productVariant = prd.variants.find((vrnt) => {
        return cart[index].color === vrnt.color;
      });

      //! setting the price...
      orderCredentials.totalOrderPrice =orderCredentials.totalOrderPrice + cart[index].qty * productVariant.price ;


      console.log(index ,"====cart====", cart[index] ,"====abc=====", productVariant , "====ordrprice====" , orderCredentials);
    }`1`

    console.log("totalordrvalue frm frntend." , totalOrderValue);


    const ordr = new Order({ customer, cart, totalOrderValue, status });

    const r = await ordr.save();

    res.status(200).json({
      message: "The order has been received successfully...",
      response: r,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add order to the DB.", error });
  }
};

module.exports = { addOrderController };
