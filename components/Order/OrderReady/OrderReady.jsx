import React from "react";

const OrderReady = ({ orders, onStatusChange }) => {
  if (!orders || orders.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <div className="space-y-">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 space-y-3 max-w-md ml-4"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center">
            <p className="text-green-600 text-sm font-semibold">
              Order Id: {order.id}
              <span className="text-gray-400 font-normal ml-1">
                (Self - Pickup)
              </span>
            </p>
            <p className="text-sm text-gray-800 font-medium">
              Date: {order.date}
            </p>
          </div>

          {/* Customer Info */}
          <div className="text-sm text-gray-800 space-y-1">
            <p className="font-semibold">{order.customer}</p>
            <p>{order.phone}</p>
            <p>{order.pickupTime}</p>
          </div>

          {/* Order Status Timeline */}
          <div className="space-y-1 text-sm text-gray-700 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
              <p>Order Placed - Apr 09, 2024 | 02:00PM</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
              <p>Order Confirmed - Apr 09, 2024 | 02:00PM</p>
            </div>
          </div>

          {/* Items List */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Order Items:
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.qty} × {item.name}
                  </span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total and Payment Info */}
          <div className="text-sm text-gray-800 font-medium flex justify-between items-center border-t pt-2">
            <span>Total Bill Amount</span>
            <span>
              <span className="bg-gray-100 border border-green-600 text-green-700 px-2 py-0.5 rounded text-xs mr-1">
                PAID - {order.payment}
              </span>
              ₹{order.total}
            </span>
          </div>

          {/* Order Ready Button */}
          <button
            onClick={() => onStatusChange(order.id, "Packed Orders")}
            className="w-full bg-lime-600 text-white py-2 rounded font-medium hover:bg-lime-700 transition"
          >
            Order Ready
          </button>

          {/* Time Left */}
          <p className="text-xs text-center text-gray-600 mt-2">
            Customer will pick the Order on
            <br />
            <span className="font-medium text-black">
              Time Left: {order.timeLeft}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderReady;
