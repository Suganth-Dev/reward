import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import OrderCard from './OrderCard';

const OrdersSection = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('confirmation');
  
  const tabs = [
    { id: 'confirmation', label: 'Confirmation', count: 6 },
    { id: 'preparing', label: 'Preparing', count: 2 },
    { id: 'packed', label: 'Packed Orders', count: 2 },
    { id: 'completed', label: 'Completed', count: 0 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Orders</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <span>Last Update at: June 02, 2024 | 11:25 PM</span>
          <button className="ml-2 p-1 hover:bg-gray-100 rounded-full">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === tab.id
                  ? 'text-lime-600 border-b-2 border-lime-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 overflow-auto max-h-[calc(100vh-300px)]">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
