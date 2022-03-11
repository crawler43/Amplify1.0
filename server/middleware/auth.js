const User = require("../models/users")
const jwt = require("jsonwebtoken");


exports.isAuth = async (req, res, next)=> {

    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:"You must be logged in"});
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user= await User.findById(decoded.id);
        next();
    }catch(err){
        return res.json({success:false,message:"You must be logged in"});
    }
}
