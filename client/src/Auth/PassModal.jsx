import { useState } from "react";
import axios from "axios";
import { usePassModal } from "./PasswordModal";

const ResetPassword = ({ email }) => {
  const { deactivate } = usePassModal();
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPass !== confPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3200/auth/reset-password",
        { email:email, newPass, confPass },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setError("");
        setSuccess("Password updated successfully!");
        setTimeout(() => {
          deactivate();
        }, 1800);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={deactivate}
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500 transition-colors"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 text-center mb-6">
          Reset Password
        </h2>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-[#222] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-full border border-gray-600 bg-[#222] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold rounded-full hover:scale-105 transition-all duration-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
