import "./App.css";
import {useAuthModel} from './Auth/AuthModal'
import Discover from "./Discover Page/Discover";
import Landing from "./Landing Page/Landing";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import AuthInitialize from "./components/AuthInitialize";
import Blog from "./components/Blog";
import BlogPost from "./Discover Page/BlogPost"
import EditBlog from "./Discover Page/EditBlog"

function App() {
  const { showLogin, showSignup, openLogin, openSignup, closeAll } =useAuthModel();

  return (
    <>
          <Provider store={store}>
            <BrowserRouter>
              <AuthInitialize />
              <div className="dark:bg-black bg-white">
              {showSignup && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-50">
                  <SignUp CloseonClick={closeAll} toLogin={openLogin} />
                </div>
              )}

              {showLogin && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-50">
                  <SignIn close={closeAll} openSign={openSignup} />
                </div>
              )}
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/discover" element={<Discover />}></Route>
                <Route path="/blogs/:id" element={<Blog/>}></Route>
                <Route path="/profile/:id" element={<Profile/>}></Route>
                <Route path="/blogs" element={<BlogPost/>}></Route>
                <Route path="/blogs/edit/:id" element={<EditBlog/>}></Route>
              </Routes>
              </div>
            </BrowserRouter>
          </Provider>
    </>
  );
}

export default App;
