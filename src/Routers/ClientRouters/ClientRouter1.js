const express = require('express');

// importing controllers
const {getProductController , findproductbyidController , createPostController , getPostController , getRightSidebarUserListController , getAvailableTshirtSizeController ,  handleLikeController , handleCommentController , updateAvatarController , getNoticeController , getBloodDonationPostController, getOneUsersPostController, handleDeleteCommentController, getDonorController} = require('./ClientControlers1')

const {addUserController , getUserController , loginUserCpntroller , getUserByIdController , updateUserController , updatePasswordController } = require('./UserControllers');

const { isTokenValid } = require('../../middlewares/middlewares')

// Importing mongoose models
// const Product = require("../../models/product");

const ClientRouter1 = express.Router();



ClientRouter1.get('/getproducts' ,  getProductController);
ClientRouter1.get('/getavailablesizes' , getAvailableTshirtSizeController);
ClientRouter1.get('/product/:id', findproductbyidController);
// ClientRouter1.post('/addorder', addOrderController);



ClientRouter1.get('/getuser', getUserController);
ClientRouter1.get('/getuserbyid/:id', isTokenValid , getUserByIdController);
ClientRouter1.post('/adduser', addUserController);
ClientRouter1.post('/updatepassword' , isTokenValid , updatePasswordController);
ClientRouter1.put('/updateuser/:id', isTokenValid , updateUserController);
ClientRouter1.post('/user/login', loginUserCpntroller);


ClientRouter1.post('/createpost', isTokenValid , createPostController);
ClientRouter1.get('/getposts', isTokenValid , getPostController);
ClientRouter1.get('/getusersposts/:id', getOneUsersPostController);
ClientRouter1.get('/getnotice', getNoticeController);
ClientRouter1.get('/getbloodnotice', getBloodDonationPostController);
ClientRouter1.get('/getrightsidebaruserlist', getRightSidebarUserListController);
ClientRouter1.post('/like' , isTokenValid , handleLikeController);
ClientRouter1.post('/comment', isTokenValid , handleCommentController);
ClientRouter1.delete('/deletecomment', isTokenValid , handleDeleteCommentController);
ClientRouter1.post('/updateavatar/:uID', isTokenValid , updateAvatarController);
ClientRouter1.get('/getdonors' , getDonorController);


module.exports = ClientRouter1;