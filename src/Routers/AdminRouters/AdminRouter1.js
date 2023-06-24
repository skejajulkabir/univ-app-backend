const express = require('express');

// requiring controllers
const { addproductsController , updateproductController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts', addproductsController );
AdminRouter1.put('/updateproducts', updateproductController );


module.exports = AdminRouter1;