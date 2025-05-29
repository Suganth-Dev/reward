import React, { useState, useEffect } from "react";
import phone from "../../../src/assets/phone.png";
import place from "../../../src/assets/place.png";

const OrderModal = ({ order, onClose, onStatusChange }) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const initialChecks = {};
    order.items.forEach((item) => {
      initialChecks[item.name] = false;
    });
    setCheckedItems(initialChecks);

    // Add ESC key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [order, onClose]);

  const handleCheck = (itemName) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);
  // style={{ backgroundColor: "#00000080" }}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-black/20">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 relative my-10 font-inter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Order Confirmation
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Order Info */}
          <div className="border border-gray-300 rounded-md px-4 py-3 bg-white text-[14px] leading-[100%] tracking-[0px] space-y-3">
            <div className="flex justify-between text-[#668D12] font-medium">
              <span>
                Order Id:{" "}
                <span className="font-semibold text-[#668D12]">{order.id}</span>
              </span>
              <span className="text-black">Date: {order.date}</span>
            </div>

            <div className="pt-1 space-y-1 text-gray-800">
              <p className="font-semibold">Order for:</p>
              <p>{order.customer}</p>

              <div className="flex flex-wrap gap-4 items-start text-gray-700 text-sm">
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <img src={phone} alt="Phone" className="w-4 h-4" />
                  <p>{order.phone}</p>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <img src={place} alt="Location" className="w-4 h-4" />
                  <p>{order.address}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <p className="text-sm ">Order Placed</p>
                </div>
                <p className="text-xs text-gray-700">Apr 09, 2024 | 02:00PM</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <p className="text-sm ">Order Confirmed</p>
                </div>
                <p className="text-xs text-gray-700">Apr 09, 2024 | 05:00PM</p>
              </div>
            </div>
          </div>

          {/* Right: Item Checklist */}
          <div className="border border-gray-300 rounded-md px-4 py-3 bg-white text-[14px] leading-[100%] tracking-[0px]">
            <p className="text-[#668D12] font-semibold mb-3">
              Verify all the items –{" "}
              {String(order.items.length).padStart(2, "0")} Item
              {order.items.length > 1 ? "s" : ""}
            </p>
            <ul className="space-y-2 text-gray-800">
              {order.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2">
                  <input
                    id={`check-${item.name}`}
                    type="checkbox"
                    checked={checkedItems[item.name] || false}
                    onChange={() => handleCheck(item.name)}
                    className="mt-1 w-4 h-4 accent-[#668D12]"
                  />
                  <label
                    htmlFor={`check-${item.name}`}
                    className="flex justify-between w-full text-sm"
                  >
                    <span>
                      {item.qty} × {item.name}
                    </span>
                    <span className="text-gray-700">₹{item.price}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ready for Delivery Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => onStatusChange(order.id, "Order Ready")}
            disabled={!allChecked}
            className={`w-[300px] py-2 rounded-md font-semibold text-sm transition ${
              allChecked
                ? "bg-[#668D12] text-white hover:bg-[#567a0f]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Ready for Delivery
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">
          *Select all items to proceed to next step
        </p>
      </div>
    </div>
  );
};

export default OrderModal;
