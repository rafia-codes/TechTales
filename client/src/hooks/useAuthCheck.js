import apiClient from "../apiClient.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSucc } from "../redux/authSlice.js";

export default function useAuthCheck() {
  const dispatch=useDispatch();

  useEffect(()=>{
    const authcheck=async()=>{
      try {
        const res=await apiClient.get('/auth/me');
        if(res.data.user)
          dispatch(loginSucc(res.data.user));
      } catch (err) {
        console.log('Auth check failed:', err.response?.data || err.message);
      }
    }
    authcheck();
  },[]);
}

 
