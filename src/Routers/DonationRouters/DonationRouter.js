const express = require('express');


const { addDonationController, initiate_SSL_DONATION, donationSuccessController, donationFailedController, donationCancelledController } = require('./DonationController')

// importing controllers


const DonationRouter = express.Router();



DonationRouter.get('/init',  initiate_SSL_DONATION );
DonationRouter.post('/adddonation',  addDonationController);
DonationRouter.post('/success/:id',  donationSuccessController);
DonationRouter.post('/failed/:id',  donationFailedController);
DonationRouter.post('/cancelled/:id',  donationCancelledController);





// MailRouter.get('/getproducts', getProductController);

module.exports = DonationRouter;