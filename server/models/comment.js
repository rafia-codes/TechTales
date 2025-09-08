const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true,
        min:3
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const comment=mongoose.model("comment",commentSchema);