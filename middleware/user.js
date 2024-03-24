const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    console.log(words);
    const jwtToken = words[1];
    const decodedvalue =  jwt.verify(jwtToken,JWT_SECRET);
    console.log(decodedvalue);

    
    if(decodedvalue.username){
        req.username = decodedvalue.username;
      next();
    }else{
      res.status(403).json({msg : "You are not authenticated"});
    }
}

module.exports = userMiddleware;