const express = require('express');


const { sendOTPhandler } = require('./MailControllers')

// importing controllers


const MailRouter = express.Router();



MailRouter.post('/sendotp', sendOTPhandler);












// MailRouter.get('/getproducts', getProductController);

module.exports = MailRouter;