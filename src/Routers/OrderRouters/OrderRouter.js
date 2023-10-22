const express = require('express');


//? importing controllers================================================
const { addOrderController, validatePaymentController } = require('./OrderController')



const OrderRouter = express.Router();



OrderRouter.post('/addorder', addOrderController );





// MailRouter.get('/getproducts', getProductController);

module.exports = OrderRouter;