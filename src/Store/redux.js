import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-reducer";
import expenseSlice from "./expense-context";

const store = configureStore({
  reducer: { auth: authSlice.reducer, expense: expenseSlice.reducer },
});

export default store;
