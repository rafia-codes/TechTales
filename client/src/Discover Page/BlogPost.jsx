import { useState } from "react";
import DashBoard from "./DashBoard";
import { useNavigate } from "react-router";
import axios from "axios"

export default function CreateBlogForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isDraft: false,
    readingtime: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("clicked hua h");
    e.preventDefault();
    try {
        const res = await axios.post(
      "http://localhost:3200/blogs",
      formData,
      {
        withCredentials: true,
      });
      if (res.status==201) {
      alert("Blog created successfully!");
      setTimeout(() => {
        navigate("/discover");
      }, 2000);
    }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <>
      <DashBoard />
      <div className="max-w-3xl mx-auto mt-5 px-5 pb-8 pt-5 mb-3 bg-white dark:bg-[#111] rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          Craft a New Blog Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              value={formData.title}
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
              value={formData.readingtime}
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
              value={formData.content}
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
              checked={formData.isDraft}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90"
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
