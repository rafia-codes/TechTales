import DashBoard from "./DashBoard.jsx";
import Card from "../components/Cards.jsx";
import apiClient from "../apiClient.js";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

function Discover() {
  const [blogs,setBlogs]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    const getBlogs=async()=>{
      try {
        const res=await apiClient.get('/blogs/all');
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error.message);
      }
    }
    getBlogs();
  },[]);
  
  return (
    <>
      <div>
        <DashBoard />
      </div>
      <div className=" dark:bg-black bg-white flex flex-wrap gap-8 mt-10 mx-12"> 
        {blogs.map((blog,idx)=>
          <Card blog={blog} key={idx} onClick={()=>navigate(`/blogs/${blog._id}`)}></Card>
        )}
      </div>
    </>
  );
}

export default Discover;
