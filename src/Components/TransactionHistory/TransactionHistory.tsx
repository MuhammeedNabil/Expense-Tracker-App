/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../State/Store";
import { App } from "../ChartData/ChartData";
import {useState, useEffect} from 'react'
import {
  IExpense,
  addTransaction,
  calculateBalance,
  calculateExpense,
  calculateIncome,
} from "../../State/Reducers/ExpenseSlice";

export default function TransactionHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const expensesAmount = useSelector(
    (state: RootState) => state.expense.transactionHistory
  );

  // -------------------------------to get the data after the refresh-----------------------------------
  const [transactionList , setTransactionList] = useState<IExpense[]>([]);
  if (expensesAmount.length > 0) {
    localStorage.setItem("userTransactions", JSON.stringify(expensesAmount));
  }
  useEffect(() => {
    // get data from localStorage
    const storedTransactions = JSON.parse(
      localStorage.getItem("userTransactions") || "[]"
    );
  
    // If expensesAmount is empty and storedTransactions has data, dispatch actions to update the Redux store
    if (expensesAmount.length === 0 && storedTransactions.length > 0) {
      storedTransactions.forEach((transaction: IExpense) => {
        dispatch(addTransaction(transaction));
      });
  
      dispatch(calculateBalance());
      dispatch(calculateExpense());
      dispatch(calculateIncome());
    }
    // Update transactionList with data from the Redux store
    setTransactionList(expensesAmount);
  }, [dispatch, expensesAmount]);


  return (
    <>
      <div className="container py-3 shadow border border-dark border-1 mt-3 text-white">
        {expensesAmount.map((expense, i) => (
          <div
            key={i}
            className={
              expense.amount < 0
                ? "shadow-sm d-flex align-items-center p-1 my-2 rounded bg-danger px-2 justify-content-center"
                : "shadow-sm d-flex p-1 my-2 rounded bg-success justify-content-center px-2 align-items-center "
            }
          >
            <div className="col-lg-3">{expense.expenceName}</div>
            <div className="col-sm-3">{expense.amount}</div>
            <div className="col-sm-3">{expense.date}</div>
            <div className="col-sm-3">{expense.note}</div>
          </div>
        ))}

        {expensesAmount.length === 0 ? (
          <div className="p-1 my-3 text-center">
            {"' There aren't Transactions yet '"}
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="h-25 w-25">
              <App />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
