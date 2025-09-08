import { useContext, createContext, useState } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin=()=>{
    setShowLogin(true);
    setShowSignup(false);
  }

  const openSignup=()=>{
    setShowLogin(false);
    setShowSignup(true);
  }

  const closeAll=()=>{
    setShowLogin(false);
    setShowSignup(false);
  }

  return (
    <AuthModalContext.Provider value={{ showLogin, showSignup, openLogin, openSignup, closeAll }}>
        {children}
    </AuthModalContext.Provider>
  )
};

export const useAuthModel=()=>useContext(AuthModalContext);