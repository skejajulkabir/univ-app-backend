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


const isModerator = async (req , res , next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenResponse = jwt.verify(token, 'openSecretKey');
        const { roles } = tokenResponse;
    
        if (roles.includes("MODERATOR")) {
            next();
        } else {
            res.status(403).json( { message : "You don't have permissions to access this point." })
        }
        
    } catch (error) {
        console.log(error)
    }
}



const isTokenValid = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader) {
        return res.status(401).send({ msg: "Authorization header missing" });
      }
  
      const token = authorizationHeader.split(' ')[1];
      const tokenResponse = jwt.verify(token, 'openSecretKey');
      console.log(tokenResponse);
      
      const { exp } = tokenResponse;
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      if (currentTimestamp >= exp) {
        res.status(498).send({ msg: "Token has expired" });
      } else {
        console.log('Token is valid from middlewares');
        next();
      }
    } catch (error) {
      console.log("jwt catch " + error);
      res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  };
  


module.exports = { isAdmin , isModerator , isTokenValid }