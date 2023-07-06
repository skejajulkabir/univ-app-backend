// Importing mongoose models
const Product = require("../../models/product");



// const updateproductController = async (req,res)=>{};


const addproductsController = async (req, res) => {
    try {
      const products = req.body;
  
      for (let i = 0; i < products.length; i++) {
        const { title , author, brand , slug , description , img , category , price , done , reviews , variants ,} = products[i];

        const product = new Product({ title , author, brand , slug , description , img , category , price , done , reviews, variants });
  
        await product.save();
      }
  
      res.status(200).json({ message: "Products have been added successfully to the DB." });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Could not add products to the DB.", error });
    }
}

const updateproductController = async (req,res)=>{
  try {
    for (let i = 0; i <= req.body.length; i++) {
        await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
        .then(() => {
        //   console.log('Data updated successfully.');
          res.status(200).json({ message: "Products has been updated successfully to the DB."})
        })
        .catch(error => {
          console.error('Error saving data:', error);
          res.status(505).json({ message: "Could not update products to the db." , error: error });
        });
    };
  } catch (error) {
      console.log("some error occured in updateproducts.js" , error)
  }
};




const deleteProductController = async (req,res)=>{
  try {
        await Product.findByIdAndDelete(req.params.id)
        .then((msg) => {
        //   console.log('Data updated successfully.');
          res.status(200).json({ message: "THE PRODUCT has been deleted successfully from the DB." , msg})
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          res.status(505).json({ message: "Could not delete products to the db." , error: error });
        });
  } catch (error) {
      console.log("some error occured in updateproducts.js" , error)
  }
};




// so this is the CRUD operation... the read functionality is at client1 segment...
module.exports = {addproductsController , updateproductController , deleteProductController};