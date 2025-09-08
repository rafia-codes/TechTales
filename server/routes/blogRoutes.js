const express=require('express');
const router=express.Router();
const {verifyUser}=require('../middlewares/authmiddleware')
const {addBlog,readBlog,updateBlog,deleteBlog,read}=require('../controller/blogController');
const handler=require('../utils/handler');

//CREATE
router.post("/",verifyUser,handler(addBlog));//userId

router.get("/all",handler(read));

//READ
router.get("/:id",handler(readBlog));//blogid

//UPDATE
router.put("/:id",verifyUser,handler(updateBlog));//blogId

//DELETE
router.delete("/:id",verifyUser,handler(deleteBlog));//blogId

module.exports=router;