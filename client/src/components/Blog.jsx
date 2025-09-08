import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlogCompo from "./BlogCompo";
import axios from "axios";
import DashBoard from "../Discover Page/DashBoard";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
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

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <DashBoard/>
      <SingleBlogCompo blog={blog} />
    </div>
  );
}

export default Blog;
