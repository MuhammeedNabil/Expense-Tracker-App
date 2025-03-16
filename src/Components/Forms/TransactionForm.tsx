/* eslint-disable jsx-a11y/anchor-is-valid */
// import Form from 'react-bootstrap/Form';
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../State/Store";
import {
  IExpense,
  addTransaction,
  calculateBalance,
  calculateExpense,
  calculateIncome,
} from "../../State/Reducers/ExpenseSlice";
import './TransactionForm.styles.css';

const PREDEFINED_CATEGORIES = [
  // Income Categories
  { value: "Salary", icon: "fa-money-bill-wave", type: "income" },
  { value: "Freelance", icon: "fa-laptop-code", type: "income" },
  // Expense Categories
  { value: "Transportation", icon: "fa-car", type: "expense" },
  { value: "Entertainments", icon: "fa-film", type: "expense" },
  { value: "Installments", icon: "fa-credit-card", type: "expense" },
  { value: "Shopping", icon: "fa-shopping-bag", type: "expense" },
  { value: "Food & Drinks", icon: "fa-utensils", type: "expense" },
  { value: "Traveling", icon: "fa-plane", type: "expense" },
  { value: "Healthcare", icon: "fa-hospital", type: "expense" },
  { value: "Education", icon: "fa-graduation-cap", type: "expense" }
];

export default function TransactionForm() {
  const [expense, setExpense] = useState<IExpense>({
    expenceName: "",
    amount: "",
    date: "",
    note: "",
  });
  
  const dispatch = useDispatch<AppDispatch>();
  
  const onChange = <k extends keyof IExpense>(key: k, value: IExpense[k]) => {
    setExpense({ ...expense, [key]: value });
  };

  const isFormFilled = expense.amount !== "" && expense.date !== "" && expense.expenceName !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTransaction(expense));
    dispatch(calculateBalance());
    dispatch(calculateExpense());
    dispatch(calculateIncome());
    setExpense({ expenceName: "", amount: "", date: "", note: "" });
  };

  const isCustomCategory = !PREDEFINED_CATEGORIES.map(cat => cat.value).includes(expense.expenceName);

  return (
    <div className="form-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Add New Transaction</h3>

        <div className="form-section">
          <Form.Group controlId="expenseName">
            <Form.Label className="section-title">Category</Form.Label>
            <div className="radio-group">
              {PREDEFINED_CATEGORIES.map(category => (
                <div
                  key={category.value}
                  className={`category-box ${expense.expenceName === category.value ? "selected" : ""} ${category.type === "income" ? "income-category" : "expense-category"}`}
                  onClick={() => onChange("expenceName", category.value)}
                >
                  <Form.Check
                    className="radio-item"
                    name="expenceName"
                    value={category.value}
                    type="radio"
                    checked={expense.expenceName === category.value}
                    label={category.value}
                    onChange={(e) => onChange("expenceName", e.target.value)}
                  />
                  <i className={`fas ${category.icon} category-icon`}></i>
                </div>
              ))}

              <div className={`category-box other-box ${isCustomCategory ? "selected" : ""}`}>
                <div className="other-input-container">
                  <div className="other-radio-wrapper">
                    <Form.Check
                      name="expenceName"
                      type="radio"
                      checked={isCustomCategory}
                      onChange={() => {
                        if (!isCustomCategory) {
                          onChange("expenceName", "");
                        }
                      }}
                    />
                    <Form.Control
                      className="other-input text-white"
                      name="expenceName"
                      value={isCustomCategory ? expense.expenceName : ""}
                      type="text"
                      placeholder="Type custom category..."
                      onClick={() => {
                        if (!isCustomCategory) {
                          onChange("expenceName", "");
                        }
                      }}
                      onChange={(e) => onChange("expenceName", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form.Group>
        </div>

        <div className="form-section">
          <Form.Group controlId="Amount">
            <Form.Label className="section-title">Amount</Form.Label>
            <div className="amount-notice">
              Enter your Income with positive value and your Expenses with negative value
            </div>
            <Form.Control
              className="form-input text-white"
              type="number"
              value={expense.amount}
              name="amount"
              placeholder="Enter The Amount"
              onChange={(e) => onChange("amount", e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="form-section">
          <Form.Group controlId="Date">
            <Form.Label className="section-title">Date</Form.Label>
            <Form.Control
              className="form-input"
              type="date"
              value={expense.date}
              name="date"
              onChange={(e) => onChange("date", e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="form-section">
          <Form.Group controlId="Notes">
            <Form.Label className="section-title">Notes</Form.Label>
            <textarea
              className="form-textarea"
              name="note"
              value={expense.note}
              placeholder="Enter any Comments"
              onChange={(e) => onChange("note", e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="form-actions">
          {isFormFilled ? (
            <Button type="submit" className="submit-button">
              Add Transaction
            </Button>
          ) : (
            <div className="form-error">
              Please fill in all required fields
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
