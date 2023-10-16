// Importing mongoose models
const Product = require("../../models/product");
const AvailableTshirtSize = require("../../models/availableTshirtSize");
const User = require("../../models/userModel");
const Order = require('../../models/OrderModel')


const jwt = require('jsonwebtoken');

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
    const { name, data } = req.body;

    const newSize = new AvailableTshirtSize({ name, data });

    await newSize.save();

    res
      .status(200)
      .json({ message: "Sizes have been added successfully to the DB." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add sizes to the DB.", error });
  }
};



const updateSizeController = async (req, res) => {
  const oID = req.body._id; 

  try {
    const updatedSize = await AvailableTshirtSize.findOneAndUpdate(
      { _id: oID },
      req.body,
      { new: true }
    );

    if (!updatedSize) {
      return res.status(404).json({ message: "Size not found." });
    }

    res.status(200).json({ message: "Size updated successfully.", size: updatedSize });
  } catch (error) {
    res.status(400).json({ message: "Could not update the Size.", error });
  }
};








const deleteSizeController = async (req, res) => {
  console.log(req.body);
  const oID = req.body.OId; I

  try {
    const deletedSize = await AvailableTshirtSize.findOneAndDelete(
      { _id: oID }
    );


    if (!deletedSize) {
      return res.status(404).json({ message: "Size not found." });
    }

    res.status(200).json({ message: "Size deleted successfully.", deletedSize: deletedSize });
  } catch (error) {
    res.status(400).json({ message: "Could not delete the Size.", error });
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






const updateOrderController = async (req, res) => {
  const oID = req.body.oID; // Assuming your order ID is stored in _id field
  const updatedStatus = req.body.updatedStatus;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: oID },
      { status: updatedStatus },
      { new: true } // This option returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ message: "Order updated successfully.", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: "Could not update the order.", error });
  }
};






  const addRolesController = async (req , res) =>{
    
    const {usrID , userRole} = req.body;
    
    



    const token = req.headers.authorization.split(' ')[1];
    const tokenResponse = jwt.verify(token, 'openSecretKey');
    
    if(!tokenResponse.roles.includes("admin")){
      res.status(403).json({ message : "You don't have permission to add roles."});
      return
    }

    try {
      const Usr = await User.findById(usrID);

      if(!Usr){
        res.status(404).json({ message : "User not found."});
        return
      }
      Usr.role.push(userRole);

      const newUsr = await Usr.save();
  
      res.status(200).json({ message: "Role added successfully.", user : newUsr });
    } catch (error) {
      res.status(400).json({ message: "there was a problem adding the role...", error });
    }

  }














// so this is the CRUD operation... the read functionality is at client1 segment...
module.exports = {
  addproductsController,
  updateproductController,
  deleteProductController,
  addSizesController,
  getOrdersHandler,
  updateOrderController,
  updateSizeController,
  deleteSizeController,
  addRolesController
};
