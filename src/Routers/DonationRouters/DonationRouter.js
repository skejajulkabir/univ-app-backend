const express = require('express');


const { addDonationController } = require('./DonationController')

// importing controllers


const DonationRouter = express.Router();



DonationRouter.post('/adddonation',  addDonationController);





// MailRouter.get('/getproducts', getProductController);

module.exports = DonationRouter;