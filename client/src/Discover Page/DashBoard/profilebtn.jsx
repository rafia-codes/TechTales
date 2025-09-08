import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAuthModel } from "../../Auth/AuthModal.jsx";

function profilebtn() {
  const { openLogin } = useAuthModel();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isLoggedIn) navigate(`/profile/${user._id}`);
    else openLogin();
  };
  const handlePostBtn =()=>{
    if(isLoggedIn)
      navigate(`/blogs`);
    else openLogin();
  }

  return (
    <>
      <button onClick={handleClick}>
        {isLoggedIn ? (
          <img
            src={user.profilepic}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            Sign In
          </span>
        )}
      </button>

      <button onClick={handlePostBtn}>
        <span className="cursor-pointer bg-gradient-to-r from-[#94B3FD] to-[#C78DFF] text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
          + Craft 
          </span>
      </button>
    </>
  );
}

export default profilebtn;
