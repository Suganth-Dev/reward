import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import logonew from '../assets/logonew.png';

const MobileInput = () => {
  const navigate = useNavigate();
  const { mobileNumber, setMobileNumber } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const payload = {
      mobile: mobileNumber,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:4000/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'OTP request failed');
      }

      console.log('Mobile Number:', mobileNumber);
      setSuccessMessage('OTP sent successfully!');

      setTimeout(() => {
        navigate('/otp-verification');
      }, 1500);
    } catch (err) {
      console.error('OTP request failed:', err);
      setError(err.message || 'Failed to request OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-8 flex flex-col gap-6">
        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm text-center font-medium">
            {successMessage}
          </div>
        )}

        <div className="w-20 h-20 mx-auto">
          <img src={logonew} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Get started with REWARDIFY</h1>
          <p className="text-gray-600">
            Enter your mobile number or Shop ID <br /> to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            type="tel"
            value={mobileNumber}
            onChange={handleChange}
            placeholder="Enter shop ID / Mobile Number"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={mobileNumber.length !== 10 || isLoading}>
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <div className="text-xs text-center text-gray-500">
          By clicking, you agree to <br /> our{' '}
          <a href="#" className="text-[#8BAD2B]">Terms & Conditions</a> and{' '}
          <a href="#" className="text-[#8BAD2B]">Privacy Policy</a>.
        </div>
      </div>
    </Card>
  );
};

export default MobileInput;
