import { configureStore } from "@reduxjs/toolkit";
import ExpenseReducer from "./Reducers/ExpenseSlice";

const store = configureStore({
  reducer: {
    expense: ExpenseReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
