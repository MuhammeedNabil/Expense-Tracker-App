import expenseReducer, {
    addTransaction,
    calculateBalance,
    calculateExpense,
    calculateIncome,
  } from './ExpenseSlice';
  // ------------------Set initialState
  describe('expense slice', () => {
    it('should handle adding a transaction', () => {
      const initialState = {
        balance: 0,
        expense: 0,
        income: 0,
        transactionHistory: [],
      };
  // ------------------set a Mockup data as the pushed in the Array as the length should be 1
      const expense = {
        expenceName: 'installments',
        amount: -50,
        date: '2023-12-01',
        note: 'test note',
      };
  
      const expenseStateAmount = expenseReducer(initialState, addTransaction(expense));
  
      expect(expenseStateAmount.transactionHistory).toHaveLength(1);
      expect(expenseStateAmount.transactionHistory[0]).toEqual({
        expenceName: 'installments',
        amount: -50,
        date: '2023-12-01',
        note: 'test note',
      });
    });
  // ------------------Calculate the actions to make sure that it works fine with mockup data
    it('should handle calculating balance, income, and expense', () => {
      const initialState = {
        balance: 0,
        expense: 0,
        income: 0,
        transactionHistory: [
          { expenceName: 'Salary', amount: 1000, date: '2023-12-01', note: 'Monthly salary' },
          { expenceName: 'Rent', amount: -500, date: '2023-12-02', note: 'Monthly rent' },
          { expenceName: 'Groceries', amount: -50, date: '2023-12-03', note: 'Weekly grocery shopping' },
        ],
      };
  //  expexted from balance (1000-550) = 450
      const nextState = expenseReducer(initialState, calculateBalance());
      expect(nextState.balance).toBe(450);
  //  expexted from income (1000) = 1000
      const nextStateWithIncome = expenseReducer(nextState, calculateIncome());
      expect(nextStateWithIncome.income).toBe(1000);
  //  expexted from Expense (-500 + -50) = 550
      const nextStateWithExpense = expenseReducer(nextState, calculateExpense());
      expect(nextStateWithExpense.expense).toBe(550);
    });
  });
  