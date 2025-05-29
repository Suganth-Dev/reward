import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import OnboardingProgress from '../components/OnboardingProgress';
import Header from '../components/Header'

const OnboardingAgreement = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const steps = [
    {
      title: 'Store Information',
      description: 'Owner name, Store location, Store address',
      status: 'completed',
    },
    {
      title: 'Store Document',
      description: 'GSTIN Number, PAN Number, Bank details',
      status: 'completed',
    },
    {
      title: 'Agreement',
      description: 'REWARDIFY partner Agreement',
      status: 'current',
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    navigate('/thanksfor')
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
              <h2 className="text-lg font-semibold mb-4">Partner Agreement</h2>
              <p className="text-sm text-gray-600 mb-4">
                Read the document below and agree to the terms to proceed.
              </p>
              <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 prose prose-sm">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Porta eget congue eu condimentum diam. Sed nulla viverra pharelis non enim commodo sed ullamcorper. Amet risus pretium eleifend eget eu vitae. Id cursus velit erat non porttitor. Arcu feugiat proin purus platea. Adipiscing donec risus molestie vitae malesuada. Elit in massa tempor vivamus nisi. Vel aliquet proin et lobortis morbi dui sodales neque. Facilisis nisi facilisis erat id convallis arcu.
                </p>
                <p>
                  Accumsan adipiscing scelerisque egestas dignissim quam accumsan. Pretiu orttitor. Arcu feugiat proin purus platea. Adipiscing donec risus molestie vitae malesuada. Elit in massa tempor vivamus nisi. Vel aliquet proin et lobortis morbi dui sodales neque. Facilisis nisi facilisis erat id convallis arcu. Accumsan adipiscing scelerisque egestas dignissim quam accumsan.
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded text-[#8BAD2B] focus:ring-[#8BAD2B]"
                />
                I have read all the terms & conditions and agree to them.
              </label>
            </div>

            <Button onClick={handleContinue} disabled={!agreed}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OnboardingAgreement;
