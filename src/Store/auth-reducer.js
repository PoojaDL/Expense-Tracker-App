import { createSlice } from "@reduxjs/toolkit";

const initState = { isLoggedIn: !!localStorage.getItem("token"), token: {} };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
