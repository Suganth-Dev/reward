import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import TransactionItem from './TransactionItem';
import SettlementItem from './SettlementItem';

const TransactionHistory = ({ transactions, settlements }) => {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transaction</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <span>Last Update at: June 02, 2024 | 11:25 PM</span>
          <button className="ml-2 p-1 hover:bg-gray-100 rounded-full">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <div className="flex">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'transactions'
                ? 'text-lime-600 border-b-2 border-lime-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            All Transaction
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'settlements'
                ? 'text-lime-600 border-b-2 border-lime-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('settlements')}
          >
            Settlements
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[500px]">
        {activeTab === 'transactions' ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {settlements.map((settlement) => (
              <SettlementItem key={settlement.id} settlement={settlement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
