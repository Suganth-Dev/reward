import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import OtpInput from '../components/OtpInput';
import Timer from '../components/Timer';
import logonew from '../assets/logonew.png';

const OtpVerification = () => {
  const navigate = useNavigate();
  const { mobileNumber, otp, setOtp, setOtpVerified } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // List of mobile numbers that have stores
  const mobilesWithStores = ['9876543210', '9999999999', '8888888888'];

  useEffect(() => {
    // Clear OTP input on component mount
    setOtp(['', '', '', '']);
  }, [setOtp]);

  const handleVerifyOtp = () => {
    setIsLoading(true);

    setTimeout(() => {
      const hasStores = mobilesWithStores.includes(mobileNumber);

      // Simulate access token & store OTP verified flag
      localStorage.setItem('accessToken', 'fake-token');
      setOtpVerified(true);

      if (hasStores) {
        navigate('/select-store');
      } else {
        navigate('/no-store');
      }

      setIsLoading(false);
    }, 1000); // Simulate a delay
  };

  const handleResendOtp = () => {
    if (canResend) {
      setOtp(['', '', '', '']);
      setResendTimer(60);
      setTimerActive(true);
      setCanResend(false);
    }
  };

  const handleTimerEnd = () => {
    setCanResend(true);
    setTimerActive(false);
  };

  return (
    <Card>
      <div className="p-8 flex flex-col gap-6">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto">
          <img src={logonew} alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Verify your details</h1>
          <p className="text-gray-600">Enter OTP number below</p>
        </div>

        {/* OTP Input */}
        <div className="flex flex-col gap-6">
          <OtpInput otp={otp} setOtp={setOtp} />

          {/* Verify Button */}
          <Button 
            onClick={handleVerifyOtp}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify and Continue'}
          </Button>
        </div>

        {/* Timer / Resend */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't receive OTP?{' '}
            {timerActive ? (
              <>Resend in <Timer initialSeconds={resendTimer} onTimerEnd={handleTimerEnd} /></>
            ) : (
              <button onClick={handleResendOtp} className="text-[#8BAD2B] font-medium">
                Resend
              </button>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OtpVerification;
