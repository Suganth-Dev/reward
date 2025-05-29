import React from 'react';

const ActionCard = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center bg-lime-50 rounded-lg p-5 hover:bg-lime-100 transition-colors"
    >
      <div className="mb-2">
        {icon}
      </div>
      <div className="text-center text-xs md:text-sm">
        {label.split(' ').map((word, i) => (
          <div key={i}>{word}</div>
        ))}
      </div>
    </button>
  );
};

export default ActionCard;
