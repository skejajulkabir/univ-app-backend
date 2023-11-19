const express = require('express');


const {  } = require('./DonationController')

// importing controllers


const DonationRouter = express.Router();



DonationRouter.get('/init',  );
DonationRouter.get('/validatepayment',  );
DonationRouter.post('/success/:id',  );
DonationRouter.post('/failed/:id' ,  )
DonationRouter.post('/cancelled/:id' ,  )





// MailRouter.get('/getproducts', getProductController);

module.exports = DonationRouter;