const express=require('express');
const router=express.Router();
const handler = require('../utils/handler');
const {verifyUser}=require('../middlewares/authmiddleware');
const {registerUser,loginUser,logout,refreshtoken,userInfo}=require('../controller/authController');
const {requestReset,verifyOtp,resetPassword}=require('../controller/otpController');


router.get('/me',verifyUser,handler(userInfo));
router.post('/register',handler(registerUser));
router.post('/login',handler(loginUser));
router.post('/refresh',handler(refreshtoken));
router.post('/logout',handler(logout));
router.post('/request-reset',handler(requestReset));
router.post('/verify-otp',handler(verifyOtp));
router.post('/reset-password',handler(resetPassword));

module.exports=router;