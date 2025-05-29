import React from 'react';
import { Check } from 'lucide-react';

const OnboardingProgress = ({ steps }) => {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-[#8BAD2B] text-white'
                  : step.status === 'current'
                  ? 'bg-[#f9f9e9] border-2 border-[#8BAD2B]'
                  : 'bg-gray-200'
              }`}
            >
              {step.status === 'completed' && <Check size={14} />}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-16 ${
                  step.status === 'completed' ? 'bg-[#8BAD2B]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnboardingProgress;
