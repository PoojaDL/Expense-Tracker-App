import { createSlice } from "@reduxjs/toolkit";

const initExpense = { expense: [], totalCost: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initExpense,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
    countTotal(state, action) {
      state.totalCost = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
