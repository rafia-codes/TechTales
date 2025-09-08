const Blog=require('../models/blog');
const BlogValidation=require('../utils/validators');

module.exports.addBlog=async (req,res) => {
    // const {error}=BlogValidation.validate(req.body);
    // if(error)
    //     return res.status(400).json({message:error.details[0].message});
    const {title,content}=req.body;
    const author=req.user.id;
    const blog=new Blog({title,content,author});
    await blog.save();
    return res.status(201).json({ message: "Blog created successfully", blog });
};

module.exports.read=async(req,res)=>{
    let blogs=await Blog.find({}).limit(25).populate('author','username profilepic displayName');
    return res.status(200).json({blogs});
};

module.exports.readBlog=async (req,res) => {
    const blog=await Blog.findById(req.params.id).populate("author","displayName _id");
    return res.status(201).json({ message: "Blog is here", blog });
};

module.exports.updateBlog=async (req,res) => {
    // const {error}=BlogValidation.validate(req.body);
    // if(error)
    //     return res.status(400).json({message:error.details[0].message});
    const {title,content}=req.body;
    const blog=await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if(blog.author.toString()!=req.user.id)
        return res.status(403).json({ message: "Not allowed to update this blog" });
    blog.title=title;
    blog.content=content;
    await blog.save();
    return res.status(201).json({message:"Updated"});
};

module.exports.deleteBlog=async (req,res) => {
    const {id}=req.params;
    const blog=await Blog.findByIdAndDelete(id);
    if(!blog)
        return res.status(400).json({message:"Blog not found"});
    return res.status(201).json({message:"Blog deleted successfully"});
}