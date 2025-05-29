import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

const SettlementItem = ({ settlement }) => {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start">
        <div className="p-2 bg-lime-50 rounded-full mr-3">
          <FileSpreadsheet size={20} className="text-lime-600" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{settlement.title}</div>
              <div className="text-xs text-gray-500">
                Paid on {settlement.date} at {settlement.time}
              </div>
              <div className="text-xs text-gray-600 mt-1">{settlement.type}</div>
            </div>
            <div className="flex flex-col items-end">
              <div
                className={`font-semibold ${
                  settlement.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {settlement.amount}
              </div>
              <div className="text-green-600 text-sm mt-1">Paid</div>
              <button className="text-red-500 text-sm underline mt-1">View</button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{settlement.timeAgo} ago</div>
        </div>
      </div>
    </div>
  );
};

export default SettlementItem;
