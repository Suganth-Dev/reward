import React, { useState } from "react";
import ConfirmationTab from "../ConfirmationTab/ConfirmationTab";
import PreparingTab from "../Prepare/PreparingTab";
import PackedOrdersTabs from "../PackedOrderTab/PackedOrderTab";
import CompletedTab from "../CompletedTab/CompletedTab";
import OrderModal from "../OrderModel/OrderModel";
import OrderReady from "../OrderReady/OrderReady";

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
                { label: "Store Confirmation", time: "Apr 09, 2024 | 02:00PM" },
                { label: "Delivery Accepted", time: "Apr 10, 2024 | 03:00PM" },
                { label: "Delivery Pickup", time: "Apr 10, 2024 | 03:30PM" },
              ],
            }),
            ...(newStatus === "Completed" && {
              deliveryTimeline: [
                { label: "Delivery pickup", time: "Apr 10, 2024 | 03:30PM" },
                { label: "Delivered", time: "Apr 10, 2024 | 06:00PM" },
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
    <div className="min-h-screen bg-[#F9F9F9] p-4 sm:p-6">
      {/* Header and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">My Orders</h2>
          <p className="text-xs text-gray-500">
            Last Update at:{" "}
            <span className="text-black">June 02, 2024 | 11:25 PM</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border px-3 py-2 rounded-md w-full sm:w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm sm:text-base font-medium ${
              activeTab === tab
                ? "text-lime-700 border-b-2 border-lime-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab} (
            {
              orders.filter((o) =>
                tab === "Preparing"
                  ? o.status === "Preparing" || o.status === "Order Ready"
                  : o.status === tab
              ).length
            }
            )
          </button>
        ))}
      </div>

      {/* Tabs Rendering */}
      {activeTab === "Confirmation" && (
        <ConfirmationTab
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      )}

      {activeTab === "Preparing" && (
        <div className="space-y-6">
          <PreparingTab
            orders={filteredOrders.filter((o) => o.status === "Preparing")}
            onStatusChange={handleStatusChange}
            onSelectOrder={(order) => setSelectedOrder(order)}
          />
          <OrderReady
            orders={filteredOrders.filter((o) => o.status === "Order Ready")}
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
