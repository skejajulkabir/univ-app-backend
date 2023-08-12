const express = require('express');

// importing controllers
const {getProductController , findproductbyidController , createPostController , getPostController , getRightSidebarUserListController , getAvailableTshirtSizeController , addOrderController , handleLikeController , handleCommentController , updateAvatarController} = require('./ClientControlers1')

const {addUserController , getUserController , loginUserCpntroller , getUserByIdController , updateUserController , updatePasswordController } = require('./UserControllers')

// Importing mongoose models
// const Product = require("../../models/product");

const ClientRouter1 = express.Router();



ClientRouter1.get('/getproducts', getProductController);
ClientRouter1.get('/getavailablesizes', getAvailableTshirtSizeController);
ClientRouter1.get('/product/:id', findproductbyidController);
ClientRouter1.post('/addorder', addOrderController);



ClientRouter1.get('/getuser', getUserController);
ClientRouter1.get('/getuserbyid/:id', getUserByIdController);
ClientRouter1.post('/adduser', addUserController);
ClientRouter1.post('/updatepassword', updatePasswordController);
ClientRouter1.put('/updateuser/:id', updateUserController);
ClientRouter1.post('/user/login', loginUserCpntroller);


ClientRouter1.post('/createpost', createPostController);
ClientRouter1.get('/getposts', getPostController);
ClientRouter1.get('/getrightsidebaruserlist', getRightSidebarUserListController);
ClientRouter1.post('/like', handleLikeController);
ClientRouter1.post('/comment', handleCommentController);
ClientRouter1.post('/updateavatar', updateAvatarController);


module.exports = ClientRouter1;