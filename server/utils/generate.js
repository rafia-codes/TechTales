const User=require('../models/user');

const generateusername=async(name="user")=>{
    const numb=Math.floor(Math.random()*10000);
    const ifUsernumberAlreadyExists=await User.findOne({username:`${name}${numb}`});
    if(ifUsernumberAlreadyExists)return generateusername(name);
    return `${name}${numb}`;
}

const generateotp=()=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

module.exports={generateusername,generateotp};