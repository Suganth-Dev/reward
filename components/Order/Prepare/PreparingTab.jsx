import React from "react";
import OrderCard from "../OrderCard/OrderCard";

const PreparingTab = ({ orders, onStatusChange, onSelectOrder }) => {
  const preparingOrders = orders.filter((o) => o.status === "Preparing");
  const orderReadyOrders = orders.filter((o) => o.status === "Order Ready");

  return (
    <div className="space-y-8">
      {/* Preparing Section */}
      <div>
        {/* <h3 className="text-lg font-semibold mb-2 text-gray-700">Preparing</h3> */}
        {preparingOrders.length ? (
          <div className="grid md:grid-cols-2 gap-5">
            {preparingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
                onClick={() => onSelectOrder(order)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No preparing orders found.
          </p>
        )}
      </div>

      {/* Order Ready Section */}
      <div>
        {orderReadyOrders.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {orderReadyOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
                onClick={() => onSelectOrder(order)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreparingTab;
