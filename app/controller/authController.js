const User = require('../model/user');
const { statusCodes } = require('http-status-codes');
const AuthUtil = require('../utils/authUtil');

module.exports.register = async(req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                    msg : "Please provide all the fields"
            })
        }
        const emailAlreadyExist = await User.findOne({email});
        if(emailAlreadyExist){
            return res.status(409).json({
                msg : "Email Already Exists"
            })
        }
        const user = await User.create(req.body);
        res.status(201).json({
            msg : "User Registered Successfully",
            user : {
                username : user.name
            },
            status : true
        })
    }catch(err){
        res.status(500).json({
            err : "Internal Server Error"
        })
    }
}

module.exports.login = async(req, res, next) => {
    try{
        const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            msg : "Please provide all the fields"
        })
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            msg : "Invalid Credentials"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return res.status(401).json({
            msg : "Invalid Credentials"
        })
    }
    const token = AuthUtil.generateToken(user);
        res.status(201).json({
            user : {
                msg : "User Successfully logged In",
                username : user.name,
                token : token
            }
        })
    }catch(err){
        res.status(500).json({
            err : "Internal Server Error"
        })
    }   
}
