import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TransactionForm from './TransactionForm';

const mockStore = configureMockStore();
const initialState = {
    expense: {
      balance: 0,
      expense: 0,
      income: 0,
      transactionHistory: [],
    },
  };
// ----------------------------Test the form inputs with the labels
test('renders TransactionForm', () => {
  const store = mockStore({initialState});
  render(
    <Provider store={store}>
      <TransactionForm />
    </Provider>
  );

  expect(screen.getByLabelText('Category')).toBeInTheDocument();
  expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  expect(screen.getByLabelText('Date')).toBeInTheDocument();
});

// ----------------------------Test the form submission with valid data
test('form submission with valid data', () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <TransactionForm />
    </Provider>
  );

  // Filling form with mockup data 
  fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Transportation' } });
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-01-01' } });

  // Submit the form
  fireEvent.click(screen.getByText('Please Fill the Form first to Add.'));
});