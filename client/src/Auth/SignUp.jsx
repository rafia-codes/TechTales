import { useState } from "react";
import InputBox from "../components/InputBox.jsx";
import apiClient from "../apiClient.js";
import { useNavigate } from "react-router";
import { useAuthModel } from "./AuthModal.jsx";

export default function SignUpPage({ CloseonClick, toLogin }) {
  const { closeAll } = useAuthModel();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/register",formData);
      if (res.status == 200) {
        closeAll();
        navigate("/discover");
      }
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

   const handleoauth=(provider)=>{
    window.location.href = `https://techtales-1-ez4f.onrender.com/oauth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 py-2">
      <div className="max-w-md w-full bg-[#111] p-8 rounded-2xl shadow-2xl text-white">
        <button
          onClick={CloseonClick}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500"
        >
          ×
        </button>
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 mb-6">
          Create Your Bloggify Account
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <InputBox
            type="text"
            placeholder="Full Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          <InputBox
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            onClick={(e) => (handlelogin(e), CloseonClick)}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 text-black font-bold rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-600 w-full"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="border-t border-gray-600 w-full"></div>
        </div>

        
        <div className="grid">
          <button className="flex items-center justify-center py-4 border border-gray-600 rounded-lg hover:bg-gray-800 transition cursor-pointer" onClick={()=>handleoauth("google")}>
            <i className="fab fa-google text-red-400 mr-2"></i> Google
          </button>
          {/* <button className="flex items-center justify-center py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition cursor-pointer" onClick={()=>handleoauth("facebook")}>
            <i className="fab fa-facebook text-sky-400 mr-2"></i> Facebook
          </button>
          <button className="flex items-center justify-center py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition gap-2 cursor-pointer" onClick={()=>handleoauth("github")}>
            <i className="fa-brands fa-github text-xl"></i>
            <span>GitHub</span>
          </button>
          <button className="flex items-center justify-center py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition cursor-pointer" onClick={()=>handleoauth("discord")}>
            <i className="fa-brands fa-discord text-blue-500 mr-2"></i> Discord
          </button> */}
        </div>

        <p
          className="mt-6 text-center text-sm text-gray-400 cursor-pointer"
          onClick={toLogin}
        >
          Already have an account?{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
