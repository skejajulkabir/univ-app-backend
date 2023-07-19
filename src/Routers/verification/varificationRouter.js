const express = require('express');

// requiring controllers
const { initialVarificationController } = require('./verificationController');




const verifyRouter1 = express.Router();


verifyRouter1.get('/initialvarify', initialVarificationController );


module.exports = verifyRouter1;