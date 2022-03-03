const Plans = require('../model/plans');

module.exports.createPlans = async(req, res, next) => {
    const { plan, months, price } = req.body;
    if(!plan || !months || !price){
        return res.status(400).json({
            msg : "Please Provide required fields"
        })
    }
    await Plans.create(req.body);
    res.status(200).json({
        msg : "Plan Created",
        status : true
    })
}