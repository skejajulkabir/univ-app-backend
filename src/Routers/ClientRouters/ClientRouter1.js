const express = require('express');

// importing controllers
const {getProductController , findproductbyidController} = require('./ClientControlers1')
const {addUserController , getUserController , loginUserCpntroller} = require('./UserControllers')

// Importing mongoose models
// const Product = require("../../models/product");

const ClientRouter1 = express.Router();



ClientRouter1.get('/getproducts', getProductController);
ClientRouter1.get('/product/:id', findproductbyidController);



ClientRouter1.get('/getuser', getUserController);
ClientRouter1.post('/adduser', addUserController);
ClientRouter1.post('/user/login', loginUserCpntroller);


module.exports = ClientRouter1;