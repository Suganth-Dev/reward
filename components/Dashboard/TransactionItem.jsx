import React from 'react';
import { User } from 'lucide-react';

const TransactionItem = ({ transaction }) => {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start">
        <div className="p-2 bg-lime-50 rounded-full mr-3">
          <User size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{transaction.phone} Send a Payment</div>
              <div className="text-xs text-gray-500">
                Paid on {transaction.date} at {transaction.time}
              </div>
              <div className="text-xs text-gray-600 mt-1">{transaction.method}</div>
            </div>
            <div className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.amount}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{transaction.timeAgo} ago</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
