import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = true,
}) => {
  const baseClasses = "px-4 py-3 rounded-md font-medium transition-all duration-200 ease-in-out";
  const widthClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    primary: "bg-[#8BAD2B] hover:bg-[#7a9925] text-white shadow-sm",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    link: "bg-transparent text-[#8BAD2B] hover:underline p-2",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
