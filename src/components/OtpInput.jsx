import React, { useRef, useEffect } from 'react';

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first empty input or the first input if none are filled
    const emptyIndex = otp.findIndex(digit => digit === '');
    const focusIndex = emptyIndex !== -1 ? emptyIndex : 0;
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Only accept single digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if pasting multiple digits
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current one is filled
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      // Focus last input
      inputRefs.current[3]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] focus:border-transparent"
        />
      ))}
    </div>
  );
};

export default OtpInput;
