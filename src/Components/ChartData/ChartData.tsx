import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../State/Store";

ChartJS.register(ArcElement, Tooltip, Legend);

export function App() {
  const theIncome = useSelector((state: RootState) => state.expense.income);
  const theExpense = useSelector((state: RootState) => state.expense.expense);
  const expensesAmount = useSelector(
    (state: RootState) => state.expense.transactionHistory
  );
  const chartData = {
    labels: expensesAmount.map((expense) => expense.expenceName),
    datasets: [
      {
        label: "userAmount",
        data: [theIncome, theExpense],
        backgroundColor: ["rgb(23, 194, 60)", "rgb(238, 12, 12)"],
        borderColor: ["rgb(23, 194, 60)", "rgb(238, 12, 12)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}
