// Importing mongoose models
// const User = require("../../models/userModel");
const jwt = require('jsonwebtoken');




  const initialVarificationController = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(req.headers);
    try {
      const tokenResponse = jwt.verify(token, 'openSecretKey');
      const { exp } = tokenResponse;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log(tokenResponse);
      console.log(exp);
      console.log(Date.now());
      
      if (currentTimestamp >= exp) {
        console.log('Token has expired');
        res.status(200).send({tokenResponse})
      } else {
        console.log('Token is valid');
        res.status(200).send({tokenResponse})
      }
    } catch (error) {
      console.log("jwt catch " + error);
      res.send({error: error});
    }
  };



// so this is the CRUD operation... the read functionality is at client1 segment...
module.exports = {initialVarificationController };