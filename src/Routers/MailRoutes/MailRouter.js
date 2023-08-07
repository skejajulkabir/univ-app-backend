const express = require('express');


const { sendOTPhandler , verifyOTPhandler} = require('./MailControllers')

// importing controllers


const MailRouter = express.Router();



MailRouter.post('/sendotp', sendOTPhandler);
MailRouter.post('/varifyotp', verifyOTPhandler );












// MailRouter.get('/getproducts', getProductController);

module.exports = MailRouter;