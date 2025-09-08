import useAuthCheck from '../hooks/useAuthCheck.js';
import SearchBar from './DashBoard/SearchBar.jsx';
import ProfileBtn from './DashBoard/profilebtn.jsx';
import ThemeBtn from './DashBoard/themebtn.jsx';

export default function DashBoard() {
  
  useAuthCheck();

  return (
    <div className="flex items-center justify-between px-6 py-4 dark:bg-black border-b dark:border-gray-700 shadow-md">
      
      <div className="text-2xl gap-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 cursor-pointer">
        <i className="fa-solid fa-book text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500"></i>
        <span> TechTales</span>  
      </div>

      <div className="flex-1 mx-8">
        <SearchBar />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeBtn />
        <ProfileBtn/>
      </div>
    </div>
  );
}
