// Importing mongoose models
const Product = require("../../models/product");
const AvailableTshirtSize = require("../../models/availableTshirtSize");
const Order = require('../../models/OrderModel')

// const updateproductController = async (req,res)=>{};

const addproductsController = async (req, res) => {
  try {
    const products = req.body;

    for (let i = 0; i < products.length; i++) {
      const {
        title,
        author,
        brand,
        slug,
        description,
        img,
        category,
        price,
        done,
        reviews,
        variants,
      } = products[i];

      const product = new Product({
        title,
        author,
        brand,
        slug,
        description,
        img,
        category,
        price,
        done,
        reviews,
        variants,
      });

      await product.save();
    }

    res
      .status(200)
      .json({ message: "Products have been added successfully to the DB." });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "Could not add products to the DB.", error });
  }
};














const updateproductController = async (req, res) => {
  try {
    for (let i = 0; i <= req.body.length; i++) {
      await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
        .then(() => {
          //   console.log('Data updated successfully.');
          res
            .status(200)
            .json({
              message: "Products has been updated successfully to the DB.",
            });
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          res
            .status(505)
            .json({
              message: "Could not update products to the db.",
              error: error,
            });
        });
    }
  } catch (error) {
    console.log("some error occured in updateproducts.js", error);
  }
};















const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
      .then((msg) => {
        //   console.log('Data updated successfully.');
        res
          .status(200)
          .json({
            message: "THE PRODUCT has been deleted successfully from the DB.",
            msg,
          });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        res
          .status(505)
          .json({
            message: "Could not delete products to the db.",
            error: error,
          });
      });
  } catch (error) {
    console.log("some error occured in updateproducts.js", error);
  }
};












const addSizesController = async (req, res) => {
  try {
    const s = req.body;

    const { name, data } = s;

    const pst = new AvailableTshirtSize({ name, data });

    await pst.save();

    res
      .status(200)
      .json({ message: "post have been added successfully to the DB." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add size to the DB.", error });
  }
};







const getOrdersHandler = async (req, res) => {
  try {
    let orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: "could not find orders.", error });
  }
};

















// so this is the CRUD operation... the read functionality is at client1 segment...
module.exports = {
  addproductsController,
  updateproductController,
  deleteProductController,
  addSizesController,
  getOrdersHandler,
};
