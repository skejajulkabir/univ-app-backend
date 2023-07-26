//importing models
const Post = require('../../models/postModel');
const Product = require('../../models/product');
const User = require('../../models/userModel');
const AvailableTshirtSize = require('../../models/availableTshirtSize')
const Order = require('../../models/OrderModel')




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





const addOrderController = async (req,res)=>{
    try {
        const o = req.body;
    
          const {customer , cart} = o;
  
          const ordr = new Order({ customer , cart });
    
          const r = await ordr.save();
    
        res.status(200).json({ message: "post have been added successfully to the DB." , response : r});
      } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Could not add order to the DB.", error });
      }
};



const handleLikeController = async (req, res) => {
    const { postId, name, userName } = req.body;
  
    try {
      // Check if the post with the given postId exists
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check if the user already liked the post
      const userLiked = post.likes.some(
        (like) => like.name === name && like.userName === userName
      );
  
      if (userLiked) {
        // If the user already liked the post, remove the like
        post.likes = post.likes.filter(
          (like) => !(like.name === name && like.userName === userName)
        );
      } else {
        // If the user hasn't liked the post, add the like
        post.likes.push({ name, userName });
      }
  
      // Save the updated post with the like
      const r = await post.save();
  
      return res.status(200).json({ msg: 'Like updated successfully' , response : r});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  



  const handleCommentController = async (req, res) => {
    const { postId, userId, img, name, userName, comment } = req.body;
  
    try {
      // Check if the post with the given postId exists
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Add the new comment to the post
      const newComment = {
        userId : userId,
        img: img, 
        name,
        userName,
        comment,
      };
      post.comments.push(newComment);
  
      // Save the updated post with the new comment
      const updatedPost = await post.save();
  
      return res.status(200).json({ msg: 'Comment added successfully', updatedPost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };







// const getProductController = async (req,res)=>{};



module.exports = {getProductController , findproductbyidController , createPostController , getPostController , getRightSidebarUserListController , getAvailableTshirtSizeController , addOrderController , handleLikeController , handleCommentController };