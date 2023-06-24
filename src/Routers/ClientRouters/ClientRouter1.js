const express = require('express');

// importing controllers
const {getProductController} = require('./ClientControlers1')

// Importing mongoose models
const Product = require("../../models/product");

const ClientRouter1 = express.Router();



ClientRouter1.get('/getproducts', getProductController);


module.exports = ClientRouter1;