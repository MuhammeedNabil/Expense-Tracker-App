import Balance from "./Components/Balance/Balance";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import TransactionForm from "./Components/Forms/TransactionForm";
import InitialSetup from './Components/InitialSetup/InitialSetup';

export default function App() {
  return (
    <div className="App">
      <InitialSetup />
      <div className="py-3">
        <Balance />
        <TransactionHistory />
        <TransactionForm />
      </div>
    </div>
  );
}
