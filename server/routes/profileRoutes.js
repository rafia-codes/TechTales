const express=require('express');
const router=express.Router();
const handler = require('../utils/handler');
const { showProfile }=require('../controller/profileController');


router.get('/:id',handler(showProfile));


module.exports=router;