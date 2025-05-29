import React, { useState } from 'react';
import {
  CreditCard,
  BarChart3,
  History,
  Gift,
  ClipboardEdit,
  Users,
  FileText,
  Wallet,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ActionCard from './Actioncard'

const QuickActions = () => {
  const [activePage, setActivePage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const actions = [
    [
      {
        icon: <CreditCard className="h-8 w-8" />,
        label: 'Make Payment',
        name: 'make-payment'
      },
      {
        icon: <BarChart3 className="h-8 w-8" />,
        label: 'Settlements',
        name: 'settlements'
      },
      {
        icon: <History className="h-8 w-8" />,
        label: 'Transaction History',
        name: 'transaction-history'
      },
      {
        icon: <Gift className="h-8 w-8" />,
        label: 'Gift Cards',
        name: 'gift-cards'
      }
    ],
    [
      {
        icon: <ClipboardEdit className="h-8 w-8" />,
        label: 'Request to REWARDIFY',
        name: 'request-rewardify'
      },
      {
        icon: <Users className="h-8 w-8" />,
        label: 'Refer & Earn',
        name: 'refer-earn'
      },
      {
        icon: <FileText className="h-8 w-8" />,
        label: 'Reports',
        name: 'reports'
      },
      {
        icon: <Wallet className="h-8 w-8" />,
        label: 'Refund Transaction',
        name: 'refund-transaction'
      }
    ]
  ];

  const handlePrev = () => {
    setActivePage((prev) => (prev === 0 ? actions.length - 1 : prev - 1));
    setActiveSlide(0);
  };

  const handleNext = () => {
    setActivePage((prev) => (prev === actions.length - 1 ? 0 : prev + 1));
    setActiveSlide(1);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-1 shadow-md z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative overflow-hidden">
          {actions[activePage].map((action) => (
            <ActionCard
              key={action.name}
              icon={action.icon}
              label={action.label}
              onClick={() => console.log(`Clicked on ${action.name}`)}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-1 shadow-md z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center mt-5">
        {actions.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === activePage ? 'bg-lime-600' : 'bg-gray-300'
            }`}
            onClick={() => setActivePage(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
