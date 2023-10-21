//importing models
const Post = require("../../models/postModel");
const Product = require("../../models/product");
const User = require("../../models/userModel");
const AvailableTshirtSize = require("../../models/availableTshirtSize");
const Order = require("../../models/OrderModel");

const jwt = require('jsonwebtoken');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getProductController = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      let skip = (page - 1) * limit;

      let paginatedProducts = await Product.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Check if there are more posts available
      const totalProductsCount = await Product.countDocuments();
      const remainingProducts = totalProductsCount - (skip + limit);
      const hasMore = remainingProducts > 0;

      res.status(200).json({ paginatedProducts , hasMore });

      return;
    }

    let products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(400)
      .json({ message: "this method is not allowed.", error: error });
  }
};

const findproductbyidController = async (req, res) => {
  const pid = req.params.id;
  // console.log(pid)
  try {
    let product = await Product.findOne({ _id: pid });
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ message: "could not find", error });
  }
};

const createPostController = async (req, res) => {
  try {
    const post = req.body;

    console.log(post);

    const { author, caption, typeOfThePost, imgURL, videoURL, postType } = post;

    // Find the author by _id
    const authorUser = await User.findById(author);

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found." });
    }

    // Create the post with the author's information
    const newPost = new Post({
      author: authorUser, // Set the author field to the authorUser object
      caption,
      typeOfThePost,
      imgURL,
      videoURL,
      postType,
    });

    await newPost.save();

    res
      .status(200)
      .json({ message: "Post has been added successfully to the DB." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add post to the DB.", error });
  }
};

const getPostController = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      let skip = (page - 1) * limit;

      let paginatedPosts = await Post.find()
        .populate({
          path: "author",
          select: "-password -info -contact", // Include only the fields you need
        })
        .populate({
          path: "comments.commenter",
          select: "name avatar userName", // Include only the fields you need
        })
        .select("-password -info -contact")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Check if there are more posts available
      const totalPostsCount = await Post.countDocuments();
      const remainingPosts = totalPostsCount - (skip + limit);
      const hasMore = remainingPosts > 0;

      res.status(200).json({ paginatedPosts ,  hasMore});

      return;
    }
    let posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ message: "could not find posts.", error });
  }
};

const getRightSidebarUserListController = async (req, res) => {
  try {
    let users = await User.find().select("name userName avatar").limit(10);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: "could not find posts.", error });
  }
};

const getAvailableTshirtSizeController = async (req, res) => {
  // availableTshirtSize
  let sizes = await AvailableTshirtSize.find();
  res.status(200).json({ sizes });
};

const addOrderController = async (req, res) => {
  try {
    const o = req.body;

    const { customer, cart, totalOrderValue, status } = o;

    const ordr = new Order({ customer, cart, totalOrderValue, status });

    const r = await ordr.save();

    res.status(200).json({
      message: "post have been added successfully to the DB.",
      response: r,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Could not add order to the DB.", error });
  }
};

const handleLikeController = async (req, res) => {
  const { postId, name, userName } = req.body;

  try {
    // Check if the post with the given postId exists
    const post = await Post.findById(postId)
      .populate({
        path: "author",

        select: "-password -info -contact", // Include only the fields you need
      })
      .populate({
        path: "comments.commenter",
        select: "name avatar userName", // Include only the fields you need
      })
      .select("-password -info -contact");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
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

    return res
      .status(200)
      .json({ msg: "Like updated successfully", response: r });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const handleCommentController = async (req, res) => {
  const { postId, userId, img, name, userName, comment } = req.body;

  try {
    // Check if the post with the given postId exists
    const post = await Post.findById(postId)
      .populate({
        path: "author",
        select: "-password -info -contact", // Include only the fields you need
      })
      .populate({
        path: "comments.commenter",
        select: "name avatar userName", // Include only the fields you need
      }) // Update the population to include "comments.commenter"
      .select("-password -info -contact");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Validate input data
    if (!userId || !img || !name || !userName || !comment) {
      return res.status(400).json({ msg: "Invalid comment data" });
    }

    // Add the new comment to the post
    const newComment = {
      commenter: userId, // Assuming `userId` is the commenter's ID
      comment,
    };
    post.comments.push(newComment);

    // Save the updated post with the new comment
    const responsePost = await post.save();

    const updatedPost = await responsePost.populate({
      path: "comments.commenter",
      select: " name avatar userName",
    });

    return res
      .status(200)
      .json({ msg: "Comment added successfully", updatedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const handleDeleteCommentController = async (req, res) => {
  const { postId, commentId, userId } = req.body;

  
  
  const token = req.headers.authorization.split(' ')[1];
  const tokenResponse = jwt.verify(token, 'openSecretKey');
  const { roles } = tokenResponse;
  console.log(tokenResponse)
  
  if (roles.includes("MODERATOR")) {
    try {
      //? Check if the post with the given postId exists
      const post = await Post.findById(postId)
        .populate({
          path: "comments.commenter",
          select: " name avatar username",
        })
        .populate({
          path: "author",
          select: "-password -info -contact",
        });
  
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      // Find the comment to be deleted
      const comment = post.comments.find((c) => c._id.toString() === commentId);
  
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      // Check if the user making the request is the author of the comment
      // if (comment.commenter._id.toString() !== userId) {
      //   return res
      //     .status(403)
      //     .json({ msg: "Unauthorized to delete this comment" });
      // }
  
      // Remove the comment from the post's comments array
      post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
  
      // Save the updated post without the deleted comment
      const newPost = await post.save();
  
      // const newPost = await pst.populate({
      //   path : "comments.commenter",
      //   select : " name avatar username"
      // }).populate({
      //   path: "author",
      //   select: "-password -info -contact"
      // });
  
      return res
        .status(200)
        .json({ msg: "Comment deleted successfully", newPost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }


    
  }
  //!if its from the user...
  else {
    try {
      //? Check if the post with the given postId exists
      const post = await Post.findById(postId)
        .populate({
          path: "comments.commenter",
          select: " name avatar username",
        })
        .populate({
          path: "author",
          select: "-password -info -contact",
        });
  
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      // Find the comment to be deleted
      const comment = post.comments.find((c) => c._id.toString() === commentId);
  
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      // Check if the user making the request is the author of the comment
      if (comment.commenter._id.toString() !== userId) {
        return res
          .status(403)
          .json({ msg: "Unauthorized to delete this comment" });
      }
  
      // Remove the comment from the post's comments array
      post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
  
      // Save the updated post without the deleted comment
      const newPost = await post.save();
  
      // const newPost = await pst.populate({
      //   path : "comments.commenter",
      //   select : " name avatar username"
      // }).populate({
      //   path: "author",
      //   select: "-password -info -contact"
      // });
  
      return res
        .status(200)
        .json({ msg: "Comment deleted successfully", newPost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }


  
};

//?update avatar

const uploadDir = path.join(__dirname, "../../public/uploads");
const avatarDir = path.join(uploadDir, "avatars");

// Create parent directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create avatars directory if it doesn't exist
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir);
    }
    cb(null, avatarDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "avatar-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage }).single("avatar");

const updateAvatarController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading avatar:", err);
      return res.status(500).json({ error: "Failed to upload avatar", err });
    }

    try {
      const userId = req.params.uID;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.file) {
        if (user.avatar) {
          try {
            const avtrName = user.avatar.split("/")[6];
            fs.unlinkSync(`${avatarDir}/${avtrName}`);
            // console.log(`${avatarDir}/${avtrName}`)
            // console.log(`${avtrName}`)
          } catch (error) {
            console.log(error);
          }
        }
        // console.log(avatarDir);
        // console.log(user.avatar);

        // Update the avatar field in the user document
        user.avatar = `${process.env.backendURL}/static/uploads/avatars/${req.file.filename}`;
        await user.save();

        // await Post.updateMany(
        //   { "author": user._id },
        //   {
        //     "author": user._id,  
        //   }
        // );

        return res.status(200).json({
          message: "Avatar updated successfully",
          avatarURL: user.avatar,
        });
      } else {
        return res.status(400).json({ error: "No avatar file provided" });
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

const getBloodDonationPostController = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      let skip = (page - 1) * limit;

      let notices = await Post.find({ postType: "BLOOD_DONATION_POST" })
        .populate({
          path: "author",
          select: "-password -info -contact", // Include only the fields you need
        })
        .populate({
          path: "comments.commenter",
          select: "name avatar userName", // Include only the fields you need
        })
        .select("-password -info -contact")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        // Check if there are more posts available
        const totalPostsCount = await Post.countDocuments();
        const remainingPosts = totalPostsCount - (skip + limit);
        const hasMore = remainingPosts > 0;

      res.status(200).json({ notices , hasMore });

      return;
    }
    let notices = await Post.find({ postType: "BLOOD_DONATION_POST" })
      .populate({
        path: "author",
        select: "-password -info -contact", // Include only the fields you need
      })
      .populate({
        path: "comments.commenter",
        select: "name avatar userName", // Include only the fields you need
      })
      .select("-password -info -contact")
      .sort({ createdAt: -1 });

    res.status(200).json({ notices });
  } catch (error) {
    res.status(400).json({ message: "could not find notices.", error });
  }
};

const getNoticeController = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      let skip = (page - 1) * limit;

      let notices = await Post.find({ postType: "NOTICE_POST" })
        .populate({
          path: "author",
          select: "-password -info -contact", // Include only the fields you need
        })
        .populate({
          path: "comments.commenter",
          select: "name avatar userName", // Include only the fields you need
        })
        .select("-password -info -contact")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Check if there are more posts available
      const totalPostsCount = await Post.countDocuments();
      const remainingPosts = totalPostsCount - (skip + limit);
      const hasMore = remainingPosts > 0;

      res.status(200).json({ notices , hasMore });

      return;
    }
    let notices = await Post.find({ postType: "NOTICE_POST" })
      .populate("author")
      .select("-password -info -contact")
      .sort({ createdAt: -1 });

    res.status(200).json({ notices });
  } catch (error) {
    res.status(400).json({ message: "could not find notices.", error });
  }
};

const getOneUsersPostController = async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      let skip = (page - 1) * limit;

      let paginatedPosts = await Post.find({ author: userId })
        .populate("author")
        .select("-password -info -contact")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.status(200).json({ paginatedPosts });

      return;
    }
    let posts = await Post.find({ author: userId })
      .populate("author")
      .select("-password -info -contact")
      .sort({ createdAt: -1 });

    res.status(200).json({ paginatedPosts: posts });
  } catch (error) {
    res.status(400).json({ message: "could not find posts.", error });
  }
};

// const getProductController = async (req,res)=>{};

module.exports = {
  getProductController,
  findproductbyidController,
  createPostController,
  getPostController,
  getRightSidebarUserListController,
  getAvailableTshirtSizeController,
  addOrderController,
  handleLikeController,
  handleCommentController,
  updateAvatarController,
  getNoticeController,
  getBloodDonationPostController,
  getOneUsersPostController,
  handleDeleteCommentController,
};
