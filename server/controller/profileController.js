const User = require("../models/user");

module.exports.showProfile=async(req,res)=>{
    const user=await User.findById(req.params.id);
    return res.status(201).json({user});
}