import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";

const BlogCard = ({ blog,onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 w-[70%] max-w-md transition-colors flex flex-col justify-between">

      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 mb-2">
        {blog.title}
      </h2>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span>By {blog.author?.displayName || "Unknown"}</span>
        <span>{new Date(blog.createdOn).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
        {blog.content}
      </p>

      {blog.category?.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {blog.category.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200"
            >
              {cat.name || "Category"}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mt-auto pt-3">
        {/* Left side: Likes + Dislikes */}
        <div className="flex items-center space-x-5">
          <button className="flex items-center gap-1 hover:text-blue-600 transition">
            <ThumbsUp className="w-4 h-4" />
            <span>{blog.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-red-600 transition">
            <ThumbsDown className="w-4 h-4" />
            <span>{blog.dislikes}</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{blog.views}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
