import React from 'react';

const TextInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  maxLength,
  required = false,
  name,
  pattern,
  id,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] focus:border-transparent transition-all duration-200 ${className}`}
      maxLength={maxLength}
      required={required}
      name={name}
      pattern={pattern}
      id={id}
    />
  );
};

export default TextInput;
