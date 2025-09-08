import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSucc } from "../redux/authSlice";

export default function useAuthCheck() {
  const dispatch=useDispatch();

  useEffect(()=>{
    const authcheck=async()=>{
      try {
        const res=await axios.get('http://localhost:3200/auth/me',{
          withCredentials:true
        })
        if(res.data.user)
          dispatch(loginSucc(res.data.user));
      } catch (err) {
        console.log('Auth check failed:', err.response?.data || err.message);
      }
    }
    authcheck();
  },[]);
}

 
