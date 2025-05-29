import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import OnboardingProgress from '../components/OnboardingProgress';
import Header from '../components/Header';

const OnboardingStoreInfo = () => {
  const navigate = useNavigate();

  const [storeInfo, setStoreInfo] = useState({
    ownerName: '',
    email: '',
    mobileNumber: '',
    storeName: '',
    storeAddress: '',
    storeContact: '',
    workingDays: [],
    openTime: '',
    closeTime: '',
    storeImage: null,
    whatsappSame: true,
    sameAsContact: false,
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (updatedOtp.every(d => d.length === 1)) {
      setOtpVerified(true); // Simulated verification
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '']);
    setOtpVerified(false);
    setTimer(60);
    setOtpSent(true);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setTimer(60);
  };

  const validate = () => {
    const newErrors = {};
    if (!storeInfo.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!storeInfo.email) newErrors.email = 'Email is required';
    if (!storeInfo.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!storeInfo.storeName) newErrors.storeName = 'Store name is required';
    if (!storeInfo.storeAddress) newErrors.storeAddress = 'Store address is required';
    if (!storeInfo.storeContact) newErrors.storeContact = 'Store contact is required';
    if (storeInfo.workingDays.length === 0) newErrors.workingDays = 'Please select working days';
    if (!storeInfo.openTime) newErrors.openTime = 'Opening time is required';
    if (!storeInfo.closeTime) newErrors.closeTime = 'Closing time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const steps = [
    { title: 'Store Information', description: 'Owner name, Store location, Store address', status: 'current' },
    { title: 'Store Document', description: 'GSTIN Number, PAN Number, Bank details', status: 'upcoming' },
    { title: 'Agreement', description: 'REWARDIFY partner Agreement', status: 'upcoming' },
  ];

  const handleContinue = () => {
    if (validate()) navigate('/documents');
  };

  const handleWorkingDays = (day) => {
    const updatedDays = storeInfo.workingDays.includes(day)
      ? storeInfo.workingDays.filter(d => d !== day)
      : [...storeInfo.workingDays, day];
    setStoreInfo({ ...storeInfo, workingDays: updatedDays });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setStoreInfo({ ...storeInfo, storeImage: file });
  };

  return (
    <Card>
      <Header />
      <div className="max-w-4xl mx-auto my-12 px-4 md:px-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Start your Onboarding Process with Us</h1>
          <p className="text-gray-600 mt-2">
            Kindly fill all the information correctly to get onboarded quickly with REWARDIFY
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <OnboardingProgress steps={steps} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="p-6 bg-white rounded-lg shadow border">
              <h2 className="font-semibold mb-4 text-lg">Owner Information</h2>
              <div className="space-y-4">
                <TextInput placeholder="Owner's Name" value={storeInfo.ownerName} onChange={(e) => setStoreInfo({ ...storeInfo, ownerName: e.target.value })} error={errors.ownerName} />
                <TextInput placeholder="Email Address" type="email" value={storeInfo.email} onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })} error={errors.email} />
                <div className="flex gap-2">
                  <TextInput placeholder="Mobile Number" type="tel" value={storeInfo.mobileNumber} onChange={(e) => setStoreInfo({ ...storeInfo, mobileNumber: e.target.value })} error={errors.mobileNumber} />
                  {!otpSent ? (
                    <Button variant="secondary" onClick={handleSendOtp}>Send OTP</Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-10 h-10 border rounded text-center"
                        />
                      ))}
                      {otpVerified ? (
                        <span className="text-green-600 font-medium">Verified</span>
                      ) : (
                        <span className="text-gray-500 text-sm">{timer}s</span>
                      )}
                      {timer === 0 && (
                        <button onClick={handleResendOtp} className="text-sm text-blue-600 underline">Resend</button>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    By providing your <span className="font-semibold">Whatsapp Number</span> to get updates on payments, order confirmation etc.
                  </p>
                  <div className="mt-2 space-y-1">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={storeInfo.whatsappSame} onChange={() => setStoreInfo({ ...storeInfo, whatsappSame: !storeInfo.whatsappSame })} />
                      My whatsapp number is same as above
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!storeInfo.whatsappSame} onChange={() => setStoreInfo({ ...storeInfo, whatsappSame: false })} />
                      I have a different whatsapp number
                    </label>
                  </div>
                </div>
              </div>
            </div>

             {/* Store Information */}
            <div className="p-6 bg-white rounded-lg shadow border">
              <h2 className="font-semibold mb-4 text-lg">Store Information</h2>
              <div className="space-y-4">
                <TextInput placeholder="Store Name" value={storeInfo.storeName} onChange={(e) => setStoreInfo({ ...storeInfo, storeName: e.target.value })} error={errors.storeName} />
                <TextInput placeholder="Store Full Address" value={storeInfo.storeAddress} onChange={(e) => setStoreInfo({ ...storeInfo, storeAddress: e.target.value })} error={errors.storeAddress} />
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={storeInfo.sameAsContact}
                    onChange={() => {
                      setStoreInfo({
                        ...storeInfo,
                        sameAsContact: !storeInfo.sameAsContact,
                        storeContact: !storeInfo.sameAsContact ? storeInfo.mobileNumber : ''
                      });
                    }}
                  />
                  Same as my contact number
                </label>
                <div className="flex gap-2">
                  <TextInput placeholder="Store Contact Number" type="tel" value={storeInfo.storeContact} onChange={(e) => setStoreInfo({ ...storeInfo, storeContact: e.target.value })} error={errors.storeContact} />
                  <Button variant="secondary">Verify</Button>
                </div>
                <button className="flex items-center text-[#8BAD2B] text-sm font-medium hover:underline">
                  Add Store Location
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Working Days */}
            <div className="p-6 bg-white rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Working Days</h2>
                <button
                  onClick={() => setStoreInfo({ ...storeInfo, workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] })}
                  className="text-[#8BAD2B] text-sm hover:underline"
                >
                  Select All
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className={`text-sm p-2 text-center rounded cursor-pointer ${storeInfo.workingDays.includes(day) ? 'bg-[#8BAD2B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <input type="checkbox" className="hidden" checked={storeInfo.workingDays.includes(day)} onChange={() => handleWorkingDays(day)} />
                    {day.slice(0, 3)}
                  </label>
                ))}
              </div>
              {errors.workingDays && <p className="text-sm text-red-500 mt-2">{errors.workingDays}</p>}
            </div>

            {/* Working Time */}
            <div className="p-6 bg-white rounded-lg shadow border">
              <h2 className="font-semibold mb-4 text-lg">Working Time</h2>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm mb-1 text-gray-600 block">Opening Time</label>
                  <input type="time" value={storeInfo.openTime} onChange={(e) => setStoreInfo({ ...storeInfo, openTime: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
                  {errors.openTime && <p className="text-sm text-red-500 mt-1">{errors.openTime}</p>}
                </div>
                <div className="w-1/2">
                  <label className="text-sm mb-1 text-gray-600 block">Closing Time</label>
                  <input type="time" value={storeInfo.closeTime} onChange={(e) => setStoreInfo({ ...storeInfo, closeTime: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
                  {errors.closeTime && <p className="text-sm text-red-500 mt-1">{errors.closeTime}</p>}
                </div>
              </div>
            </div>

            {/* Store Image */}
            <div className="p-6 bg-white rounded-lg shadow border">
              <h2 className="font-semibold text-lg mb-2">Upload Store Image</h2>
              <p className="text-sm text-gray-500 mb-4">Uploading image will help customer to easily recognize your store</p>
              <label className="block w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:border-[#8BAD2B] cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="h-full flex flex-col items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-[#8BAD2B] font-medium">Add Profile Image</span>
                  <span className="text-xs text-gray-500">Browse or take a photo</span>
                </div>
              </label>
            </div>

            {/* Continue Button */}
            <div>
              <Button className="w-full" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>


    </Card>
  );
};

export default OnboardingStoreInfo;