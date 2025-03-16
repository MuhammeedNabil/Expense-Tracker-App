import { useSelector } from "react-redux";
import { RootState } from "../../State/Store";
import IncomeAndExpenses from "../Income&expenses/Income&expenses";
import './Balance.styles.css';

export default function Balance() {
  const theBalance = useSelector((state: RootState) => state.expense.balance);

  return (
    <div className="balance-container">
      <h1 className="app-title">
        Expense Tracking App
      </h1>
      <div className="balance-card">
        <h2 className="balance-heading">
          Your Balance
        </h2>
        <div className="balance-amount">
          $ {theBalance}
        </div>
        <div className="income-expenses-container">
          <IncomeAndExpenses />
        </div>
      </div>
    </div>
  );
}
