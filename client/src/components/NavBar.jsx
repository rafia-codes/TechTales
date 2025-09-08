import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md z-25 relative">
      <div className="flex items-center space-x-8 pl-7">
        <i className="fa-solid fa-book text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500"></i>
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500">
          TechTales
        </h1>
      </div>
      <Link to={"/discover"}>
      <button className="bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
        Explore Categories
      </button>
      </Link>
    </nav>
  );
}
