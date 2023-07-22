//importing models
const Post = require('../../models/postModel');
const Product = require('../../models/product');
const User = require('../../models/userModel');
const AvailableTshirtSize = require('../../models/availableTshirtSize')




const getProductController = async (req,res)=>{
    try {
        if(req.query.page && req.query.limit){
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);

            let skip = (page - 1) * limit;

            let paginatedProducts = await Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

            res.status(200).json({paginatedProducts});

            return
        }
        let products = await Product.find().sort({ createdAt: -1 });
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













const createPostController = async (req,res)=>{
    try {
        const post = req.body;
    
          const {author,caption,typeOfThePost,imgURL,videoURL} = post;
  
          const pst = new Post({ author, caption, typeOfThePost, imgURL, videoURL, });
    
          await pst.save();
    
        res.status(200).json({ message: "post have been added successfully to the DB." });
      } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Could not add post to the DB.", error });
      }
};




const getPostController = async (req,res)=>{
    try {
        if(req.query.page && req.query.limit){
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);

            let skip = (page - 1) * limit;

            let paginatedPosts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

            res.status(200).json({paginatedPosts});

            return
        }
        let posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({posts})
    } catch (error) {
        res.status(400).json({'message' : "could not find posts." , error})
    }
};








const getRightSidebarUserListController = async (req,res)=>{
    try {
        let users = await User.find().select('name userName avatar');
        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({'message' : "could not find posts." , error})
    } 
};



const getAvailableTshirtSizeController = async (req,res)=>{
    // availableTshirtSize
    let sizes = await AvailableTshirtSize.find();
    res.status(200).json({sizes})
};












// const getProductController = async (req,res)=>{};



module.exports = {getProductController , findproductbyidController , createPostController , getPostController , getRightSidebarUserListController , getAvailableTshirtSizeController};