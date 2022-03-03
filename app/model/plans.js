const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    plan : {
        type : String,
        required :true
    },
    months : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})



// const planSchema = new mongoose.Schema({
//     plan : {
//             type : Array,
//             planType : [
//                 {
//                     planName : "Basic",
//                     months : "1 months",
//                     price : 199,
//                     default : false
//                 },
//                 {

//                     planName : "Pro",
//                     months : "6 months",
//                     price : 499,
//                     default : false
//                 },
//                 {
//                     planName : "Enterprise",
//                     months : "12 months",
//                     price : 999,
//                     default : false
//                 }]
//             },

//     createdAt : {
//         type : Date,
//         default : new Date()
//     }
// })

module.exports = mongoose.model('Plan', planSchema);