const express = require('express');


const { sendOTPhandler , verifyOTPhandler , forgotPasswordController} = require('./MailControllers')

// importing controllers


const MailRouter = express.Router();



MailRouter.post('/sendotp', sendOTPhandler);
MailRouter.post('/varifyotp', verifyOTPhandler );
MailRouter.post('/forgotpassotpsend', forgotPasswordController );












// MailRouter.get('/getproducts', getProductController);

module.exports = MailRouter;