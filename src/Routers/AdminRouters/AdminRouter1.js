const express = require('express');
const { isAdmin } = require('../../middlewares/middlewares')


// requiring controllers
const { addproductsController , updateproductController , deleteProductController , addSizesController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts', isAdmin , addproductsController );
AdminRouter1.put('/updateproducts', updateproductController );
AdminRouter1.delete('/deleteproduct/:id', deleteProductController );





AdminRouter1.post('/addsizes', addSizesController );

module.exports = AdminRouter1;