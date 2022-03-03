const User = require('../model/user');
const stripeKey = require('../config/appConfig').STRIPE_KEY;
const stripe = require('stripe')(stripeKey);
 
module.exports.updateUser = async(req, res, next) => {
    try{
        const { name, email, password, newPassword } = req.body;
        let update;

        if(!name && !email && (!password || !newPassword)){
            return res.status(400).json({
                msg : "Please fill the required fields",
                status : false
            })
        }

        if(name){
            update = await User.findOneAndUpdate({_id : req.user.userId}, {name : name}, {new : true});
            if(!update){
                return res.status(401).json({
                    msg : "Name Updation Failed"
                })
            }
            res.status(200).json({
                msg : "Name Updated",
                status : true
            })
        }
    
        if(email){
            update = await User.findOneAndUpdate({_id : req.user.userId},{email : email}, {new : true});
            if(!update){
                return res.status(401).json({
                    msg : "Email Updation Failed"
                })
            }
            res.status(200).json({
                msg : "Email Updated",
                status : true
            })
        }
    
        if(password && newPassword){
            const user = await User.findOne({_id : req.user.userId});
            const isPasswordMatch = await user.comparePassword(password);
            if(!isPasswordMatch){
                return res.status(401).json({
                    msg : "Invalid Credentials"
                })
            }

            user.password = newPassword;
            await user.save(function(err, result){
                if(!err){
                    return res.status(200).json({
                    msg : "Password Updated"
                })
                }
                throw new Error('Something Went Wrong');
            })
        }

    }catch(err){
        res.status(500).json({
            err : "Something Went Wrong"
        })
    }
}


module.exports.deleteAccount = async(req, res, next) => {
    try{
       const user = await User.findOneAndDelete({_id : req.user.userId}, {new : true});
       (!user) ? res.status(409).json({ msg : "User does not exist"}) : res.status(200).json({ msg : "Account deleted Successfully"})
    }catch(err){
        res.status(500).json({err : "Something Went Wrong"});
    }
}


module.exports.userPlans = async(req, res, next) => {
    try{
        const { plan_id } = req.body;
        const { planID } = await User.findOne({plan_id}).select('planID -_id');
        const isPLanExist = planID.some(id => {
            if(id === plan_id){
                return 1;
            }
            return 0;
        })
        if(isPLanExist){
            return res.status(409).json({
                msg : "You already have this plan, please choose other plans",
                status : false
            })
        }
        await User.findOneAndUpdate({_id : req.user.userId}, {planStatus : true, $push: { planID : plan_id }}, {new : true});
        res.status(200).json({
            msg : "Plan Created",
            status : true
        })
    }catch(err){
        res.status(500).json({
            err : "Something went wrong"
        })
    }
}


module.exports.stripe = async(req, res, next) => {
    const amount = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount : amount,
        currency : 'usd'
    })
    res.json({
        clientSecret : paymentIntent.client_secret
    })
}