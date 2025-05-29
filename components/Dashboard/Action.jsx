import React from 'react';
import QuickAction from  './QuickAction'
import TransactionHistory from './TransactionHistroy'
import OrdersSection from './OrdersSection';
import Orderfile from './Orderfile'
import { mockTransactions, mockSettlements, mockOrders } from './mockData';

const Action = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <QuickAction />
        <TransactionHistory
          transactions={mockTransactions}
          settlements={mockSettlements}
        />
      </div>
      <div className="lg:col-span-5">
              <Orderfile />
      </div>
    </div>
  );
};

export default Action;
