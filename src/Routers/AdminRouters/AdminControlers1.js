// Importing mongoose models
const Product = require("../../models/product");


const addproductsController = async (req, res) => {
    try {
      const products = req.body;
  
      for (let i = 0; i < products.length; i++) {
        const {
          title,
          brand,
          slug,
          description,
          img,
          category,
          variants,
          size,
          color,
          price,
          availableQty,
          reviews,
        } = products[i];
  
        const product = new Product({
          title,
          brand,
          slug,
          description,
          img,
          category,
          variants,
          size,
          color,
          price,
          availableQty,
          reviews,
        });
  
        await product.save();
      }
  
      res.status(200).json({ message: "Products have been added successfully to the DB." });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Could not add products to the DB.", error });
    }
}




module.exports = {addproductsController};