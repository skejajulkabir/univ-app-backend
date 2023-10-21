const express = require('express');


const { sslInit } = require('./PaymentControllers.js')

// importing controllers


const PaymentRouter = express.Router();



PaymentRouter.get('/init', sslInit );





// MailRouter.get('/getproducts', getProductController);

module.exports = PaymentRouter;