const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String ,
        trim:true,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

userSchema.methods.generateJwtToken = function(){
    return jwt.sign({
        id:this._id
    },process.env.SECRET_KEY,{
        expiresIn:36000,
    });
}
const UserCred=mongoose.model('UserCred',userSchema);
module.exports=UserCred;