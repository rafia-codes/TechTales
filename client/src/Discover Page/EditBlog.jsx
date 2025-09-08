import { useState, useEffect } from "react";
import axios from "axios";
import DashBoard from "./DashBoard";
import { useNavigate, useParams } from "react-router";

export default function EditBlogForm() {
  const {id}=useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // Initially null until loaded

  useEffect(() => {
    console.log(id);
    const getBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/blogs/${id}`);
        if (res.status === 201) {
          setBlog(res.data.blog);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3200/blogs/${blog._id}`,
        blog,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Blog updated successfully!");
        setTimeout(() => {
          navigate("/discover");
        }, 1500);
      } else {
        alert("Failed to update blog");
      }
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!blog) {
    return <p className="text-center mt-10">Loading blog data...</p>;
  }

  return (
    <>
      <DashBoard />
      <div className="max-w-3xl mx-auto mt-5 px-5 pb-8 pt-5 mb-3 bg-white dark:bg-[#111] rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          Edit Blog Post
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              value={blog.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white"
              placeholder="Enter blog title"
            />
          </div>

          {/* Reading Time */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Estimated Reading Time (e.g. 5 mins)
            </label>
            <input
              name="readingtime"
              type="text"
              value={blog.readingtime || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white"
              placeholder="Optional"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              name="content"
              required
              rows={10}
              value={blog.content}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white"
              placeholder="Write your thoughts here..."
            />
          </div>

          {/* Is Draft */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDraft"
              name="isDraft"
              checked={blog.isDraft || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label
              htmlFor="isDraft"
              className="text-gray-700 dark:text-gray-300"
            >
              Save as Draft
            </label>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
