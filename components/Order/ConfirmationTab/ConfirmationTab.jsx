import React from "react";
import OrderCard from "../OrderCard/OrderCard";

const ConfirmationTab = ({ orders, onStatusChange, columns = "grid-cols-1 md:grid-cols-2" }) => {
  const filtered = orders.filter((o) => o.status === "Confirmation");

  return filtered.length ? (
    <div className={`grid ${columns} gap-5`}>
      {filtered.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-sm col-span-full">
      No orders found.
    </p>
  );
};

export default ConfirmationTab;





// const initialOrders = [
//   {
//     id: "12345",
//     date: "Apr 10, 2024",
//     customer: "Rajesh Kannan",
//     phone: "+918526547512",
//     address: "R S Puram, Coimbatore",
//     pickupTime: "Self-pickup: 30 Mar 2024, 10AM - 12PM",
//     items: [
//       { name: "Ooty apple", qty: 1, price: 100 },
//       { name: "White Egg", qty: 5, price: 50 },
//     ],
//     total: 150,
//     payment: "PAID - UPI",
//     status: "Confirmation",
//   },
//   {
//     id: "89123",
//     date: "May 08, 2024",
//     customer: "Priya Das",
//     phone: "+919898989898",
//     address: "Kovaipudur, Coimbatore",
//     pickupTime: "Self-pickup: 08 May 2024, 11AM - 1PM",
//     items: [
//       { name: "Papaya", qty: 2, price: 80 },
//       { name: "Spinach", qty: 1, price: 30 },
//     ],
//     total: 110,
//     payment: "PAID - CARD",
//     status: "Confirmation",
//   },
//   {
//     id: "89124",
//     date: "May 09, 2024",
//     customer: "Anand Babu",
//     phone: "+919912345678",
//     address: "Ukkadam, Coimbatore",
//     pickupTime: "Self-pickup: 09 May 2024, 3PM - 5PM",
//     items: [
//       { name: "Orange Juice", qty: 2, price: 100 },
//       { name: "Brown Bread", qty: 1, price: 40 },
//     ],
//     total: 140,
//     payment: "CASH ON DELIVERY",
//     status: "Confirmation",
//   },
//   {
//     id: "89125",
//     date: "May 10, 2024",
//     customer: "Lakshmi Narayan",
//     phone: "+918867554433",
//     address: "Hope College, Coimbatore",
//     pickupTime: "Self-pickup: 10 May 2024, 9AM - 11AM",
//     items: [
//       { name: "Milk", qty: 2, price: 90 },
//       { name: "Butter", qty: 1, price: 50 },
//     ],
//     total: 140,
//     payment: "PAID - UPI",
//     status: "Confirmation",
//   },
// ];