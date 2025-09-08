import { Link } from "react-router-dom";
import { useAuthModel } from "../Auth/AuthModal.jsx";
import Navbar from "../components/NavBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.js";
import { useEffect } from "react";
import apiClient from "../apiClient.js";

export default function Home() {
  const { openSignup } = useAuthModel();
  
  useEffect(() => {
    const refresh = async () => {
      try {
        const res=await apiClient.get('/auth/refresh');
      } catch (error) {
        console.log(error);
      }
    };
    refresh();
  }, []);
  useAuthCheck();

  return (
    <>
      <Navbar></Navbar>
      <div style={{ height: "100vh", width: "100vw" }} id="heromain">
        <iframe
          src="https://my.spline.design/claritystream-5pmGF3ql9z08wSrgYM7K6DHk/"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
        <div className="absolute top-1/2 w-full flex justify-center gap-5 transform">
          <Link to="/discover">
            <button className="cursor-pointer px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 via-blue-300 to-pink-400 text-black font-semibold shadow-md hover:scale-105 transition-transform">
              Start Reading
            </button>
          </Link>

          <button
            onClick={openSignup}
            className="cursor-pointer px-5 py-2 rounded-full border border-[#C78DFF] text-[#C78DFF] font-semibold hover:bg-[#C78DFF]/10 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
