const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedby:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  dislikedby:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  isDraft:{
    type:Boolean,
    default:false
  },
  views:{
    type:Number,
    default:0
  },
  readingtime:String
});

module.exports = mongoose.model("Blog", blogSchema);
