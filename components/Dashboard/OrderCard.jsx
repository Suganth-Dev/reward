import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const OrderCard = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between mb-3">
        <div>
          <span className="text-gray-600">Order Id: </span>
          <span className="text-lime-600 font-medium">{order.id}</span>
        </div>
        <div className="text-gray-600">Date: {order.date}</div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-1">Order for:</div>
        <div>{order.customerName}</div>
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <Phone size={14} className="mr-1" />
          <span>{order.phone}</span>
          <MapPin size={14} className="ml-3 mr-1" />
          <span>{order.address}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Order Items:</div>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <div>{item.quantity} x {item.name}</div>
            <div className="font-medium">₹{item.price.toFixed(2)}</div>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
          <div className="font-medium">Total Bill Amount</div>
          <div className="flex flex-col items-end">
            <div className="font-bold">₹{order.total.toFixed(2)}</div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
              PAID - UPI
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 border border-lime-600 text-lime-600 py-2 rounded-lg hover:bg-lime-50">
          Reject Order
        </button>
        <button className="flex-1 bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
