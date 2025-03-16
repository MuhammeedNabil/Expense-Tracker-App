/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../State/Store";
import { App } from "../ChartData/ChartData";
import { useEffect } from 'react';
import {
  IExpense,
  addTransaction,
  calculateBalance,
  calculateExpense,
  calculateIncome,
} from "../../State/Reducers/ExpenseSlice";
import './TransactionHistory.styles.css';

export default function TransactionHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const expensesAmount = useSelector(
    (state: RootState) => state.expense?.transactionHistory ?? []
  );

  useEffect(() => {
    if (expensesAmount.length > 0) {
      localStorage.setItem("userTransactions", JSON.stringify(expensesAmount));
    } else {
      const storedTransactions = JSON.parse(
        localStorage.getItem("userTransactions") || "[]"
      );
      
      if (storedTransactions.length > 0) {
        storedTransactions.forEach((transaction: IExpense) => {
          dispatch(addTransaction(transaction));
        });
        dispatch(calculateBalance());
        dispatch(calculateExpense());
        dispatch(calculateIncome());
      }
    }
  }, [dispatch, expensesAmount]);

  return (
    <div className="history-container">
      <div className="transaction-card">
        <div className="transaction-header">
          <div className="header-item">Category</div>
          <div className="header-item">Amount</div>
          <div className="header-item d-none d-md-block">Date</div>
          <div className="header-item d-none d-md-block">Note</div>
        </div>
        
        {expensesAmount.map((expense, i) => (
          <div
            key={i}
            className={`transaction-item ${expense.amount < 0 ? 'expense' : 'income'}`}
          >
            <div className="transaction-name">
              <span className="category-indicator"></span>
              {expense.expenceName}
            </div>
            <div className={`transaction-amount ${expense.amount < 0 ? 'text-danger' : 'text-success'}`}>
              ${Math.abs(Number(expense.amount)).toFixed(2)}
            </div>
            <div className="transaction-date d-none d-md-block">
              {new Date(expense.date).toLocaleDateString()}
            </div>
            <div className="transaction-note d-none d-md-block">
              {expense.note || '-'}
            </div>
            
            <div className="transaction-details-mobile d-md-none">
              <div className="mobile-detail">
                <span className="detail-label">Date:</span> {new Date(expense.date).toLocaleDateString()}
              </div>
              {expense.note && (
                <div className="mobile-detail">
                  <span className="detail-label">Note:</span> {expense.note}
                </div>
              )}
            </div>
          </div>
        ))}

        {expensesAmount.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>
            <p className="empty-state-text">No transactions yet</p>
          </div>
        ) : (
          <div className="chart-container">
            <App />
          </div>
        )}
      </div>
    </div>
  );
}
