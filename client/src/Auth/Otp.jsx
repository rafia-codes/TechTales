import { useState } from "react";
import apiClient from "../apiClient.js";
import { useOtpModal } from "./OtpModal.jsx";
import { usePassModal } from "./PasswordModal.jsx";

const Otp = ({ email }) => {
  const { closeModal } = useOtpModal();
  const { activate } = usePassModal();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/verify-otp', { email, otp });
      console.log(res);
      if (res.status === 200) {
        setError("");
        closeModal();
        activate(email);
      }
    } catch (err) {
      setError("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500 transition-colors"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the OTP sent to <span className="text-purple-400">{email}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleOtp} className="space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-[#222] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold rounded-full hover:scale-105 transition-all duration-300"
          >
            Verify
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Didn’t receive OTP?{" "}
          <button className="text-purple-400 hover:underline" onClick={handleOtp}>
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
