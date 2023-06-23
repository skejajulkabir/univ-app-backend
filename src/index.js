require('dotenv').config();
require('../src/DB/connection');

const Product = require("./models/product.js");

const express = require('express');

const app = express();

app.use(express.json());


// app.get('/getproducts', async (req, res) => {
//     products = Product.find();
//     res.status.json({products: products});
// };




app.post('/addproducts', async (req, res) => {
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
  });






app.listen(3000,()=>{
    console.log('listening on port 3000');
});