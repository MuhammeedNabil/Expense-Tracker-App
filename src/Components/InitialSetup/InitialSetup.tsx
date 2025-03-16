import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, calculateBalance, calculateIncome } from '../../State/Reducers/ExpenseSlice';
import './InitialSetup.styles.css';

export default function InitialSetup() {
  const [isOpen, setIsOpen] = useState(true);
  const [initialAmount, setInitialAmount] = useState('');
  const [hasInitialSetup, setHasInitialSetup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const setupDone = localStorage.getItem('initialSetupDone');
    if (setupDone === 'true') {
      setIsOpen(false);
      setHasInitialSetup(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialAmount) {
      const initialTransaction = {
        expenceName: 'Initial Balance',
        amount: initialAmount,
        date: new Date().toISOString(),
        note: 'Initial setup amount',
      };

      dispatch(addTransaction(initialTransaction));
      dispatch(calculateBalance());
      dispatch(calculateIncome());
      
      localStorage.setItem('initialSetupDone', 'true');
      setIsOpen(false);
      setHasInitialSetup(true);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('initialSetupDone', 'true');
    setIsOpen(false);
    setHasInitialSetup(true);
  };

  if (!isOpen || hasInitialSetup) {
    return null;
  }

  return (
    <div className="initial-setup-overlay">
      <div className="initial-setup-modal">
        <div className="initial-setup-content">
          <h2 className="initial-setup-title">Welcome to Expense Tracker!</h2>
          <p className="initial-setup-description">
            Would you like to set your initial balance? This will help you track your expenses more accurately.
          </p>
          
          <form onSubmit={handleSubmit} className="initial-setup-form">
            <div className="input-group">
              <label htmlFor="initialAmount" className="input-label">
                Initial Balance Amount
              </label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="initialAmount"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="Enter your initial balance"
                  className="initial-amount-input"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="initial-setup-actions">
              <button 
                type="button" 
                onClick={handleSkip}
                className="skip-button"
              >
                Skip for now
              </button>
              <button 
                type="submit"
                className="submit-button"
                disabled={!initialAmount}
              >
                Set Initial Balance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 