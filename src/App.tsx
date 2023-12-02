import Balance from "./Components/Balance/Balance";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import TransactionForm from "./Components/Forms/TransactionForm";

export default function App() {
  return (
    <div className="py-3">
      <Balance />
      <TransactionHistory />
      <TransactionForm />
    </div>
  );
}
