import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import Card from '../components/Card';
import Header from '../components/Header'
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import OnboardingProgress from '../components/OnboardingProgress';

const OnboardingDocuments = () => {
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [errors, setErrors] = useState({});
  const [documentInfo, setDocumentInfo] = useState({
    pan: '',
    gstin: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    qrCode: null,
    upiId: '',
  });

  const steps = [
    {
      title: 'Store Information',
      description: 'Owner name, Store location, Store address',
      status: 'completed',
    },
    {
      title: 'Store Document',
      description: 'GSTIN Number, PAN Number, Bank details',
      status: 'current',
    },
    {
      title: 'Agreement',
      description: 'REWARDIFY partner Agreement',
      status: 'upcoming',
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!documentInfo.pan) newErrors.pan = 'PAN is required';
    if (!documentInfo.gstin) newErrors.gstin = 'GSTIN is required';
    if (!documentInfo.bankName) newErrors.bankName = 'Bank name is required';
    if (!documentInfo.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!documentInfo.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!documentInfo.qrCode) newErrors.qrCode = 'QR code is required';
    if (!documentInfo.upiId) newErrors.upiId = 'UPI ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate('/agreement');
    }
  };

  const handleQRUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentInfo({ ...documentInfo, qrCode: file });
      setErrors({ ...errors, qrCode: '' });
      setTimeout(() => {
        setShowQRScanner(true);
      }, 1000);
    }
  };

  const handleConfirmUPI = () => {
    if (!documentInfo.upiId) {
      setErrors({ ...errors, upiId: 'UPI ID is required' });
      return;
    }
    setShowQRScanner(false);
  };

  const handleChange = (field, value) => {
    setDocumentInfo({ ...documentInfo, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <Card>
      <Header />
      <div className="p-8">
        <div className="flex items-center mb-8">
          <button onClick={handleBack} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Start your Onboarding Process with Us</h1>
          <p className="text-gray-600 mt-2">
            Kindly fill the all information correctly to get onboarded quickly with REWARDIFY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <OnboardingProgress steps={steps} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Enter PAN & GSTIN details</h2>
              <div className="space-y-4">
                <TextInput
                  value={documentInfo.pan}
                  onChange={(e) => handleChange('pan', e.target.value)}
                  placeholder="Store/Owner PAN"
                  error={errors.pan}
                />
                <div className="flex items-center gap-2">
                  <TextInput
                    value={documentInfo.gstin}
                    onChange={(e) => handleChange('gstin', e.target.value)}
                    placeholder="GSTIN"
                    error={errors.gstin}
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded text-[#8BAD2B] focus:ring-[#8BAD2B]" />
                    I don't have a GSTIN
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
              <div className="space-y-4">
                <TextInput
                  value={documentInfo.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  placeholder="Bank Name"
                  error={errors.bankName}
                />
                <TextInput
                  value={documentInfo.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  placeholder="Bank Account Number"
                  error={errors.accountNumber}
                />
                <TextInput
                  value={documentInfo.ifscCode}
                  onChange={(e) => handleChange('ifscCode', e.target.value)}
                  placeholder="Bank IFSC Code"
                  error={errors.ifscCode}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-2">Scan Store QR Code</h2>
              <p className="text-sm text-gray-500 mb-4">
                Scan the store's QR Code. It will help the customer to make the payments easy and faster.
              </p>
              <label className="block w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:border-[#8BAD2B] transition-colors cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleQRUpload} />
                <div className="h-full flex flex-col items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-[#8BAD2B]">Scan QR Code</span>
                  <span className="text-xs text-gray-500">Take a Picture from the Camera to upload the QR Code</span>
                </div>
              </label>
              {errors.qrCode && <p className="text-red-500 text-sm mt-2">{errors.qrCode}</p>}
            </div>

            {showQRScanner && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold text-center mb-4">Scan Your UPI</h3>
                  <div className="space-y-4">
                    <TextInput
                      value={documentInfo.upiId}
                      onChange={(e) => handleChange('upiId', e.target.value)}
                      placeholder="Store's UPI"
                      error={errors.upiId}
                    />
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setShowQRScanner(false)} className="flex-1">
                        Re-Scan UPI
                      </Button>
                      <Button onClick={handleConfirmUPI} className="flex-1">
                        Confirm UPI
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OnboardingDocuments;
