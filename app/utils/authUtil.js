const jwt = require('jsonwebtoken');
const jwtPayLoad = require('../config/appConfig');

exports.generateToken = ({_id, name}) => {
    const token = jwt.sign({
        user : name, userId : _id
    },
        jwtPayLoad.SECRET_KEY,
    {
        expiresIn : jwtPayLoad.EXPIRES_IN
    }
    )
    return token;
}

exports.ValidateToken = ({token}) => jwt.verify(token, jwtPayLoad.SECRET_KEY);