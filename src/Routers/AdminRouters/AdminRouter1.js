const express = require('express');
const { isAdmin } = require('../../middlewares/middlewares')


// requiring controllers
const { addproductsController , updateproductController , deleteProductController , addSizesController , getOrdersHandler, updateOrderController , updateSizeController, deleteSizeController, addRolesController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts', isAdmin , addproductsController );
AdminRouter1.put('/updateproducts',  updateproductController );
AdminRouter1.delete('/deleteproduct/:id',  deleteProductController );


AdminRouter1.post('/addroletoauser',  addRolesController );


AdminRouter1.get('/getorders',  getOrdersHandler );
AdminRouter1.put('/updateorder',  updateOrderController );





AdminRouter1.post('/addsizes',  addSizesController );
AdminRouter1.put('/updatesize',  updateSizeController );
AdminRouter1.delete('/deletesize',  deleteSizeController );

module.exports = AdminRouter1;