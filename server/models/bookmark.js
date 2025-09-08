const { default: mongoose } = require("mongoose");

const bookmarkSchema=new mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }],
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        required:true
    },
    savedAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

bookmarkSchema.index({user:1,blog:1},{unique:true});

const bookmark=mongoose.model("bookmark",bookmarkSchema);