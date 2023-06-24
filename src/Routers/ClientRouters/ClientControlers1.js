const Product = require('../../models/product')


// const getProductController = (req,res)=>{};


const getProductController = async (req,res)=>{
    try {
        let products = await Product.find();
        res.status(200).json({products})
    } catch (error) {
        res.status(400).json({'message' : "this method is not allowed." , 'error': error})
    }
};

module.exports = {getProductController};