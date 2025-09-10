import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox.jsx";
import apiClient from "../apiClient.js";
import { useAuthModel } from "./AuthModal.jsx";
import { useDispatch } from "react-redux";
import { loginSucc } from "../redux/authSlice.js";
import { useOtpModal } from "./OtpModal.jsx";

export default function SignIn({ close, openSign }) {
  const { closeAll } = useAuthModel();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [rememberMe, setrememberMe] = useState(false);
  const { showModal } = useOtpModal();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, rememberMe, [e.target.name]: e.target.value });
  };
  const handleRemem = (e) => {
    setrememberMe(!rememberMe);
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login",formData);
      if (res.status == 200) {
        closeAll();
        navigate("/discover");
        dispatch(loginSucc(res.data.user));
      }
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

  const handleForgotPass = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/request-reset",formData);
      console.log(typeof res.status);
      if (res.status == 200) {
        showModal(formData.emailOrUsername);
      }
    } catch (error) {
      console.log(`${error.message}`);
      if (error.response && error.response.status === 401) {
        setError("Invalid email/username or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleoauth = (provider) => {
    window.location.href = `https://techtales-1-ez4f.onrender.com/oauth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 py-2 z-50">
      <div className="max-w-md w-full bg-[#111] p-8 rounded-2xl shadow-2xl text-white">
        <button
          onClick={close}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 mb-6 text-center">
          Welcome Back to Bloggify
        </h2>

        {/* Email or Username */}
        <label className="block mb-2 text-sm text-gray-300">
          Email or Username
        </label>
        <InputBox
          type="text"
          placeholder="Enter Username or Email"
          name="emailOrUsername"
          value={formData.emailOrUsername}
          onChange={handleChange}
        />

        {/* Password */}
        <label className="block mb-2 text-sm text-gray-300">Password</label>
        <InputBox
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-purple-400"
              onClick={handleRemem}
            />
            Remember Me
          </label>
          <button
            className="hover:underline text-[#C78DFF] cursor-pointer"
            onClick={handleForgotPass}
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Sign In Button */}
        <button
          onClick={(e) => (handlelogin(e), close)}
          className="w-full py-2 cursor-pointer bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold rounded-full hover:scale-105 transition-all duration-300"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3 mb-4 justify-center">
          <button className="py-4 px-20 text-xl rounded-full border border-[#94B3FD] hover:bg-[#94B3FD]/10 transition text-white flex items-center justify-center gap-2"
            onClick={() => handleoauth("google")}
          >
            <i className="fab fa-google text-red-400"></i> Google
          </button>
          {/* <button className="flex-1 py-2 rounded-full border border-[#C78DFF] hover:bg-[#C78DFF]/10 transition text-white flex items-center justify-center gap-2" onClick={()=>handleoauth("facebook")}>
            <i className="fab fa-facebook text-sky-400 mr-2"></i> Facebook
          </button>
        </div>
        <div className="flex justify-between gap-3">
          <button className="flex items-center justify-center gap-2.5 flex-1 py-2 rounded-full border border-[#94B3FD] hover:bg-[#94B3FD]/10 transition text-white" onClick={()=>handleoauth("github")}>
            <i className="fa-brands fa-github text-xl"></i>
            <span>GitHub</span>
          </button>

          <button className="flex-1 py-2 rounded-full border border-[#C78DFF] hover:bg-[#C78DFF]/10 transition text-white flex items-center justify-center gap-2" onClick={()=>handleoauth("discord")}>
            <i className="fa-brands fa-discord text-blue-500 mr-2"></i> Discord
          </button> */}
        </div>

        <p
          className="text-sm text-center mt-6 text-gray-300 cursor-pointer"
          onClick={() => {
            openSign();
          }}
        >
          Don’t have an account?{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
