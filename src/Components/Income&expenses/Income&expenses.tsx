import { useSelector } from "react-redux";
import { RootState } from "../../State/Store";

export default function IncomeAndExpenses() {
  const theIncome = useSelector((state: RootState) => state.expense.income);
  const theExpense = useSelector((state: RootState) => state.expense.expense);
  return (
    <>
      <div className="d-flex justify-content-center">
        <h4 className="me-2">
          Income <span className="text-success">$ {theIncome}</span>
        </h4>
        <h4 className="ms-2">
          Expense <span className="text-danger">$ {theExpense}</span>
        </h4>
      </div>
    </>
  );
}
