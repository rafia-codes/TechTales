import { useState } from "react";

const InputBox = ({ type, placeholder, name, value,onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-4">
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {type === "password" && (
        <div
          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <i className="fa-solid fa-eye"></i>
          ) : (
            <i className="fa-solid fa-eye-slash"></i>
          )}
        </div>
      )}
    </div>
  );
};

export default InputBox;
