const express = require('express');
const { isAdmin , isModerator } = require('../../middlewares/middlewares')


// requiring controllers
const { addproductsController , updateproductController , deleteProductController , addSizesController , getOrdersHandler, updateOrderController , updateSizeController, deleteSizeController, addRolesController } = require('./AdminControlers1');




const AdminRouter1 = express.Router();


AdminRouter1.post('/addproducts' , isModerator ,  addproductsController );
AdminRouter1.put('/updateproducts', isModerator , updateproductController );
AdminRouter1.delete('/deleteproduct/:id',  deleteProductController );


AdminRouter1.post('/addroletoauser', isAdmin , isModerator , addRolesController );


AdminRouter1.get('/getorders', isModerator ,  getOrdersHandler );
AdminRouter1.put('/updateorder', isModerator ,  updateOrderController );





AdminRouter1.post('/addsizes', isModerator ,  addSizesController );
AdminRouter1.put('/updatesize', isModerator , updateSizeController );
AdminRouter1.delete('/deletesize', isModerator , deleteSizeController );

module.exports = AdminRouter1;