const handler=require('../utils/handler');
const User=require('../models/user');
const jwt=require('jsonwebtoken');

module.exports.verifyUser=handler(async(req,res,next)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return res.status(401).json({message:'Access token missing'});
    }
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(payload.id);
    req.user=user;
    next();
})

