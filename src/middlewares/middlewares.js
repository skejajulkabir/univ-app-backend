const authorisedUser = require('../models/authorisedUsers')
const jwt = require('jsonwebtoken');




const isAdmin = async (req , res , next)=>{
    const token = req.headers.authorization.split(' ')[1];
    const tokenResponse = jwt.verify(token, 'openSecretKey');
    const { name , username , uid } = tokenResponse;

    let usr = await authorisedUser.find({ "id" : uid });

    // if (usr.role === "ADMIN") {
    //     next();
    // }else{
    //     res.status(401).json({msg : "You are not allowed to make changes..."})
    // }
    console.log(usr)
    next();
}


module.exports = { isAdmin }