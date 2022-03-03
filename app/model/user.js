const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectID } = require('bson');

const UserSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max : 20
    },
    email: {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    password : {
        type : String,
        required : true,
        max : 1024
    },
    role : {
        type : String,
        enum : ['user'],
        default : 'user'
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    authType : {
        type : String,
        data : ['normal', 'google', 'facebook'],
        default : 'normal'
    }, 
    planStatus : {
        type : Boolean,
        default : false
    },
    planID : {
        type : Array
    }
});


UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(usersPassword){
    const isPasswordMatch = await bcrypt.compare(usersPassword, this.password);
    return isPasswordMatch;
}

module.exports = mongoose.model('User', UserSchema);