import React, { useState } from "react";
import ConfirmationTab from "../Order/ConfirmationTab/ConfirmationTab";
import PreparingTab from "../Order/Prepare/PreparingTab";
import PackedOrdersTabs from "../Order/PackedOrderTab/PackedOrderTab";
import CompletedTab from "../Order/CompletedTab/CompletedTab";
import OrderModal from "../Order/OrderModel/OrderModel";
import OrderReady from "../Order/OrderReady/OrderReady";

const initialOrders = [
  {
    id: "12345",
    date: "Apr 10, 2024",
    customer: "Rajesh Kannan",
    phone: "+918526547512",
    address: "R S Puram, Coimbatore",
    pickupTime: "Self-pickup: 30 Mar 2024, 10AM - 12PM",
    items: [
      { name: "Ooty apple", qty: 1, price: 100 },
      { name: "White Egg", qty: 5, price: 50 },
    ],
    total: 150,
    payment: "PAID - UPI",
    status: "Confirmation",
  },
  {
    id: "89123",
    date: "May 08, 2024",
    customer: "Priya Das",
    phone: "+919898989898",
    address: "Kovaipudur, Coimbatore",
    pickupTime: "Self-pickup: 08 May 2024, 11AM - 1PM",
    items: [
      { name: "Papaya", qty: 2, price: 80 },
      { name: "Spinach", qty: 1, price: 30 },
    ],
    total: 110,
    payment: "PAID - CARD",
    status: "Confirmation",
  },
  {
    id: "89124",
    date: "May 09, 2024",
    customer: "Anand Babu",
    phone: "+919912345678",
    address: "Ukkadam, Coimbatore",
    pickupTime: "Self-pickup: 09 May 2024, 3PM - 5PM",
    items: [
      { name: "Orange Juice", qty: 2, price: 100 },
      { name: "Brown Bread", qty: 1, price: 40 },
    ],
    total: 140,
    payment: "CASH ON DELIVERY",
    status: "Confirmation",
  },
  {
    id: "89125",
    date: "May 10, 2024",
    customer: "Lakshmi Narayan",
    phone: "+918867554433",
    address: "Hope College, Coimbatore",
    pickupTime: "Self-pickup: 10 May 2024, 9AM - 11AM",
    items: [
      { name: "Milk", qty: 2, price: 90 },
      { name: "Butter", qty: 1, price: 50 },
    ],
    total: 140,
    payment: "PAID - UPI",
    status: "Confirmation",
  },
];

const tabs = ["Confirmation", "Preparing", "Packed Orders", "Completed"];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("Confirmation");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            ...(newStatus === "Packed Orders" && {
              packedTimeline: [
                {
                  label: "Store Confirmation",
                  time: "Apr 09, 2024 | 02:00PM",
                },
                {
                  label: "Delivery Accepted",
                  time: "Apr 10, 2024 | 03:00PM",
                },
                {
                  label: "Delivery Pickup",
                  time: "Apr 10, 2024 | 03:30PM",
                },
              ],
            }),
            ...(newStatus === "Completed" && {
              deliveryTimeline: [
                {
                  label: "Delivery pickup",
                  time: "Apr 10, 2024 | 03:30PM",
                },
                {
                  label: "Delivered",
                  time: "Apr 10, 2024 | 06:00PM",
                },
              ],
            }),
          }
        : order
    );
    setOrders(updatedOrders);
    setActiveTab(newStatus === "Order Ready" ? "Preparing" : newStatus);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.includes(searchTerm) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "Preparing") {
      return (
        (o.status === "Preparing" || o.status === "Order Ready") &&
        matchesSearch
      );
    }
    return o.status === activeTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-3 sm:p-4">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-xl font-semibold">My Orders</h2>
          <p className="text-xs text-gray-500">
            Last Update:{" "}
            <span className="text-black">June 02, 2024 | 11:25 PM</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Search Order ID / Name"
          className="w-full sm:w-72 px-3 py-2 text-sm border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto sm:gap-5 border-b mb-4 pb-2">
        {tabs.map((tab) => {
          const tabCount = orders.filter((o) =>
            tab === "Preparing"
              ? o.status === "Preparing" || o.status === "Order Ready"
              : o.status === tab
          ).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm sm:text-base whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "text-lime-700 border-b-2 border-lime-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab} ({tabCount})
            </button>
          );
        })}
      </div>

      {/* Scrollable Content Area */}
      <div className="space-y-6 max-h-[650px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {activeTab === "Confirmation" && (
          <ConfirmationTab
            orders={filteredOrders}
            onStatusChange={handleStatusChange}
            columns="grid-cols-1"
          />
        )}

        {activeTab === "Preparing" && (
          <div className="space-y-4">
            <PreparingTab
              orders={filteredOrders.filter((o) => o.status === "Preparing")}
              onStatusChange={handleStatusChange}
              onSelectOrder={(order) => setSelectedOrder(order)}
            />
            <OrderReady
              orders={filteredOrders.filter(
                (o) => o.status === "Order Ready"
              )}
              onStatusChange={handleStatusChange}
              onGoToPackedOrders={() => setActiveTab("Packed Orders")}
            />
          </div>
        )}

        {activeTab === "Packed Orders" && (
          <PackedOrdersTabs
            orders={filteredOrders}
            onStatusChange={handleStatusChange}
          />
        )}

        {activeTab === "Completed" && (
          <CompletedTab
            orders={filteredOrders}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
