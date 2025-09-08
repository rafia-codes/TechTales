import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:null,
    isLoggedIn:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucc: (state, action) => {
      state.user= action.payload;
      state.isLoggedIn=true
    },
    logout: state => {
      state.user=null;
      state.isLoggedIn=false;
    },
  }
})

export const { loginSucc,logout } = authSlice.actions

export default authSlice.reducer