const express = require('express');

// requiring controllers
const { addproductsController , updateproductController , deleteProductController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts', addproductsController );
AdminRouter1.put('/updateproducts', updateproductController );
AdminRouter1.delete('/deleteproduct/:id', deleteProductController );


module.exports = AdminRouter1;