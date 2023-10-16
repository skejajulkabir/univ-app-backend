const jwt = require('jsonwebtoken');




const isAdmin = async (req , res , next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenResponse = jwt.verify(token, 'openSecretKey');
        const { roles } = tokenResponse;
    
        if (roles.includes("ADMIN")) {
            next();
        } else {
            res.status(403).json( { message : "You don't have permissions to access this point." })
        }
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = { isAdmin }