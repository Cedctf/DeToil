import { useState, useEffect } from 'react';
import Popup from './popup';

const TransactionHistory = ({ onToiletUse }) => {
  // Hardcoded transactions for demonstration
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'Toilet Use',
      amount: '-1.00 POO',
      timestamp: '2024-03-20 14:23',
      status: 'Completed',
      hash: '0x1234...5678',
    },
    {
      id: 2,
      type: 'Toilet Use',
      amount: '-1.00 POO',
      timestamp: '2024-03-20 12:15',
      status: 'Completed',
      hash: '0x8765...4321',
    },
    {
      id: 3,
      type: 'Toilet Use',
      amount: '-10.00 POO',
      timestamp: '2024-03-20 10:45',
      status: 'Completed',
      hash: '0x9876...1234',
    }
  ]);

  // Add state for popup
  const [showPopup, setShowPopup] = useState(false);

  const handleUseToilet = async () => {
    // Create new transaction
    const newTransaction = {
      id: transactions.length + 1,
      type: 'Toilet Use',
      amount: '-1.00 POO',
      timestamp: new Date().toLocaleString(),
      status: 'Completed',
      hash: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
    };

    // Add new transaction to the beginning of the list
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    // Show popup
    setShowPopup(true);
    
    // Call the onToiletUse prop to update wallet balance
    if (onToiletUse) {
      onToiletUse(1); // Deduct 1 POO
    }
    
    // Automatically hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '0') {
        handleUseToilet();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [transactions]); // Add transactions as dependency since we use it in handleUseToilet

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
          <div className="px-6 py-4 bg-gray-50 border-b-2 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{tx.type}</h3>
                    <p className="text-sm text-gray-500">{tx.timestamp}</p>
                  </div>
                  <span className="text-red-500 font-medium">{tx.amount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {tx.status}
                    </span>
                  </div>
                  <button
                    onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tx.hash}`, '_blank')}
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    View on Etherscan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Popup Component */}
      <Popup
        message="Deducting 1 POO token for toilet use 💩 Hope you have a BLAST!"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default TransactionHistory;
