import { Calendar, Eye, ThumbsUp, ThumbsDown, Bookmark, User, PencilLine } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios"
import { useSelector } from "react-redux";

export default function BlogCompo({ blog }) {
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth);

  const handledelete=async()=>{
    try {
     const res=await axios.delete(`http://localhost:3200/blogs/${blog._id}`,{
      withCredentials:true
     });
    if(res.status==201){
      setTimeout(()=>{
        navigate('/discover');
      },2000);
    } 
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEdit=()=>{
    navigate(`/blogs/edit/${blog._id}`);
  }

  return (
    <div className="
      min-h-screen 
      bg-white text-gray-900 
      dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black dark:text-gray-100
      transition-colors duration-300
    ">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span
            className="flex items-center gap-1 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
            onClick={() => navigate(`/profile/${blog.author?._id}`)}
          >
            <User size={16} /> {blog.author?.displayName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} /> {new Date(blog.createdOn).toLocaleDateString()}
          </span>
          <span className="cursor-pointer px-3 py-1 text-xs bg-amber-400 text-white rounded-full" onClick={()=>handleEdit()}>
            <PencilLine />
          </span>
          <span className="px-3 py-1 text-xs bg-green-600/80 text-white rounded-full">
            {blog.readingtime || "3 min read"}
          </span>
          {user?._id==blog.author?._id && (
            <span className="cursor-pointer px-3 py-1 text-xs bg-red-600/80 text-white rounded-full" onClick={()=>handledelete()}>
            Delete
          </span>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg leading-relaxed text-gray-800 dark:prose-invert dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Footer actions */}
      <div className="border-t border-gray-300 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
              <ThumbsUp size={18} /> {blog.likes?.length || 0}
            </button>
            <button className="flex items-center gap-2 hover:text-red-500 dark:hover:text-red-400 transition">
              <ThumbsDown size={18} /> {blog.dislikes?.length || 0}
            </button>
            <span className="flex items-center gap-2">
              <Eye size={18} /> {blog.views || 0} views
            </span>
          </div>

          <button className="flex items-center gap-2 hover:text-yellow-500 dark:hover:text-yellow-400 transition">
            <Bookmark size={18} /> {blog.bookmarks?.length || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
