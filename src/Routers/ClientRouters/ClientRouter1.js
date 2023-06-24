const express = require('express');

// importing controllers
const {getProductController , findproductbyidController} = require('./ClientControlers1')

// Importing mongoose models
const Product = require("../../models/product");

const ClientRouter1 = express.Router();



ClientRouter1.get('/getproducts', getProductController);
ClientRouter1.get('/product/:id', findproductbyidController);


module.exports = ClientRouter1;