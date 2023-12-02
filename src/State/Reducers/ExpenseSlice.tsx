import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BalanceState {
  balance: number;
  expense: number;
  income: number;
  transactionHistory: {
    expenceName: string;
    amount: number;
    date: string;
    note: string;
  }[];
}
export const storedTransactions = JSON.parse(
  localStorage.getItem("userTransactions") || "[]"
);
const initialState: BalanceState = {
  balance: 0,
  expense: 0,
  income: 0,
  transactionHistory: [],
};

export interface IExpense {
  expenceName: string;
  amount: number | string;
  date: string;
  note: string;
}

const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  // -----------------Reducer
  reducers: {
    // -----------------Actions
    // addTransaction is an Action which push in the Arr
    addTransaction: (state, action: PayloadAction<IExpense>) => {
      state.transactionHistory.push({
        expenceName: action.payload.expenceName,
        amount: Number(action.payload.amount),
        date: action.payload.date,
        note: action.payload.note,
      });
    },
    // -----------------------------Calculate the Total Balance Action
    calculateBalance: (state) => {
      state.balance = state.transactionHistory.reduce(
        (accumulator, expense) => accumulator + expense.amount,
        0
      );
    },
    // -----------------------------Calculate the Income Action
    calculateIncome: (state) => {
      state.income = state.transactionHistory.reduce((accumulator, expense) => {
        if (expense.amount > 0) {
          return accumulator + expense.amount;
        }
        return accumulator;
      }, 0);
    },
    // -----------------------------Calculate the Expense Action
    calculateExpense: (state) => {
      state.expense = state.transactionHistory.reduce(
        (accumulator, expense) => {
          if (expense.amount < 0) {
            return accumulator - expense.amount;
          }
          return accumulator;
        },
        0
      );
    },
  },
});

export default ExpenseSlice.reducer;
export const {
  addTransaction,
  calculateBalance,
  calculateExpense,
  calculateIncome,
} = ExpenseSlice.actions;
