const express = require('express');

// requiring controllers
const { addproductsController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts', addproductsController );


module.exports = AdminRouter1;