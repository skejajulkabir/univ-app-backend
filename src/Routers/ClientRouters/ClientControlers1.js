const Product = require('../../models/product')




const getProductController = async (req,res)=>{
    try {
        let products = await Product.find();
        res.status(200).json({products})
    } catch (error) {
        res.status(400).json({'message' : "this method is not allowed." , 'error': error})
    }
};




const findproductbyidController = async (req,res)=>{
    const pid = req.params.id;
    // console.log(pid)
    try {
        let product = await Product.findOne({ _id : pid});
        res.status(200).json({product})
    } catch (error) {
        res.status(400).json({'message' : "could not find" , error})
    }
};


// const getProductController = async (req,res)=>{};


module.exports = {getProductController , findproductbyidController };