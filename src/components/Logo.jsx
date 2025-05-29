import React from 'react';

const Logo = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  return (
    <div className="flex justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className={`${sizeClasses[size]} text-[#8BAD2B]`}
      >
        <g fill="currentColor">
          <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z" opacity="0.7" />
          <circle cx="50" cy="50" r="8" />
          <ellipse cx="50" cy="50" rx="35" ry="15" transform="rotate(45 50 50)" opacity="0.5" />
          <ellipse cx="50" cy="50" rx="35" ry="15" transform="rotate(-45 50 50)" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
