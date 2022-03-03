const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

exports.verifyToken = (req, res, next) => {
    let AuthHeader = req.headers.authorization;
    if(!AuthHeader || !AuthHeader.startsWith('Bearer ')){
        return res.status(401).json({
            err : "Authentication Failed, try again...",
            status : 401
        })
    }
    let token = AuthHeader.split(' ')[1];
    try{
        let decode = jwt.decode(token, appConfig.SECRET_KEY);
        req.user = { username : decode.user, userId : decode.userId }
        next();
    }catch(err){
        res.status(500).json({
            err : "Something Went Wrong"
        })
    }
}