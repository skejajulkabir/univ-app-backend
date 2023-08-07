const express = require('express');


const { searchUsersHandler } = require('./searchControllers')

// importing controllers


const searchRouter = express.Router();



searchRouter.post('/searchuser', searchUsersHandler );





// MailRouter.get('/getproducts', getProductController);

module.exports = searchRouter;