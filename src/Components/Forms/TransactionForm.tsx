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

  // ---------------check that the form is filled to provide adding empty transaction----------------------
  let isFormFilled = false;
  if (
    expense.amount === "" ||
    expense.date === "" ||
    expense.expenceName === ""
  ) {
    isFormFilled = false;
  } else {
    isFormFilled = true;
  }
  // ---------------to clear the form after addding the transaction----------------------
  const clearFormHandler = () => {
    setExpense({
      expenceName: "",
      amount: "",
      date: "",
      note: "",
    });
  };
  // --------------------Check to make user add his own category----------------------------
  let isOtherCategSelected = true;
  if (
    expense.expenceName === "Installments" ||
    expense.expenceName === "Entertainments" ||
    expense.expenceName === "Transportation"
  ) {
    isOtherCategSelected = false;
  } else if (expense.expenceName === "other") {
    isOtherCategSelected = true;
  }

  return (
    <>
      {/* ----------------------------Add the Transactions Form------------------------- */}
      <form
        className="container py-3 shadow text-white border border-dark border-1 mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          clearFormHandler();
          dispatch(addTransaction(expense));
          dispatch(calculateBalance());
          dispatch(calculateExpense());
          dispatch(calculateIncome());
        }}
      >
        <h3 className="text-decoration-underline border-muted text-center">
          Add New Transaction
        </h3>
        {/* ---------------------------------The Category Section Input------------------------------ */}
        <Form.Group className="mb-3" controlId="expenseName">
          <Form.Label>Category</Form.Label>
          {/* -----------------------------------Transportation section-------------------------------- */}
          <Form.Check
            name="expenceName"
            value="Transportation"
            type="radio"
            checked={expense.expenceName === "Transportation"}
            label="Transportation"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
          {/* ----------------------------------Entertainments section---------------------------------- */}
          <Form.Check
            name="expenceName"
            value="Entertainments"
            checked={expense.expenceName === "Entertainments"}
            type="radio"
            label="Entertainments"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
          {/* ----------------------------------Installments section----------------------------------- */}
          <Form.Check
            name="expenceName"
            value="Installments"
            checked={expense.expenceName === "Installments"}
            type="radio"
            label="Installments"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
          {/* -------------------------------------Other section------------------------------------------ */}
          <Form.Check
            name="expenceName"
            value="other"
            checked={expense.expenceName === "other"}
            type="radio"
            label="Other"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
          <Form.Label className="mb-1">Other Category:</Form.Label>
          {isOtherCategSelected ? (
            <Form.Control
              name="expenceName"
              value={expense.expenceName}
              type="text"
              placeholder="Write your own Category"
              onChange={(e) =>
                onChange(e.target.name as keyof IExpense, e.target.value)
              }
            />
          ) : (
            <Form.Control
              name="expenceName"
              type="text"
              value={expense.expenceName}
              disabled
              placeholder="Write your own Category"
              onChange={(e) =>
                onChange(e.target.name as keyof IExpense, e.target.value)
              }
            />
          )}
        </Form.Group>
        {/* ---------------------------------The Amount Section Input------------------------------ */}
        <Form.Group className="mb-3" controlId="Ammount">
          <Form.Label>Amount</Form.Label>
          <h4 className="form-text text-warning text-center">
            Enter your Income with positive value and your Expenses with
            nigative value
          </h4>
          <Form.Control
            type="number"
            value={expense.amount}
            name="amount"
            placeholder="Enter The Amount"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
        </Form.Group>
        {/* ---------------------------------The date Section Input--------------------------------- */}
        <Form.Group className="mb-3" controlId="Date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={expense.date}
            name="date"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          />
        </Form.Group>
        {/* ---------------------------------The note Section Input--------------------------------- */}
        <Form.Group className="mb-3" controlId="Notes">
          <Form.Label>Notes</Form.Label>
          <textarea
            name="note"
            className="form-control"
            id="note"
            value={expense.note}
            placeholder="Enter any Comments"
            onChange={(e) =>
              onChange(e.target.name as keyof IExpense, e.target.value)
            }
          ></textarea>
        </Form.Group>
        {/* -------------------------------------The button Section--------------------------------- */}
        <div className="d-flex justify-content-center pt-2">
          {isFormFilled ? (
            <Button
              type="submit"
              variant="primary"
              data-testid="addTransaction"
            >
              Add Transaction
            </Button>
          ) : (
            <div className="p-1 my-3 text-center text-danger">
              {"Please Fill the Form first to Add."}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
