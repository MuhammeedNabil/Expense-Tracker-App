import { useSelector } from "react-redux";
import { RootState } from "../../State/Store";
import IncomeAndExpenses from "../Income&expenses/Income&expenses";

export default function Balance() {
  const theBalance = useSelector((state: RootState) => state.expense.balance);

  return (
    <>
      {/* your total balance section */}
      <h1 className="fw-bold pb-3 text-decoration-underline text-white text-center">
        Expense Tracking App
      </h1>
      <div className="container py-3 shadow border border-dark border-1 text-white mt-3">
        <h2 className="text-base font-bold text-center">
          Your Balance: <span className="text-primary">$ {theBalance}</span>
        </h2>

        <div className="d-flex justify-content-center mt-3">
          <IncomeAndExpenses />
        </div>
      </div>
    </>
  );
}
