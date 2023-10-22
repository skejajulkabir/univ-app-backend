const express = require('express');


const { initiate_SSL_Payment, validatePaymentController, paymentSuccessController, paymentfailedController, paymentCancelledController } = require('./PaymentControllers')

// importing controllers


const PaymentRouter = express.Router();



PaymentRouter.get('/init', initiate_SSL_Payment );
PaymentRouter.get('/validatepayment', validatePaymentController );
PaymentRouter.post('/success/:id', paymentSuccessController );
PaymentRouter.post('/failed/:id' , paymentfailedController )
PaymentRouter.post('/cancelled/:id' , paymentCancelledController )





// MailRouter.get('/getproducts', getProductController);

module.exports = PaymentRouter;