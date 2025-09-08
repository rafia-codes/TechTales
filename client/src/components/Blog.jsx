import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlogCompo from "./BlogCompo.jsx";
import apiClient from "../apiClient.js";
import DashBoard from "../Discover Page/DashBoard.jsx";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await apiClient.get(`/blogs/${id}`);
        if (res.status === 201) {
          setBlog(res.data.blog);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <DashBoard/>
      <SingleBlogCompo blog={blog} />
    </div>
  );
}

export default Blog;
