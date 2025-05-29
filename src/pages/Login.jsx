import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import logonew from '../assets/logonew.png';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate('/mobile-input');
    }, 1000);
  };

  return (
    <Card>
      <div className="p-6 sm:p-8 flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
        
        {/* Logo centered and responsive */}
        <div className="w-20 h-20 mx-auto">
          <img src={logonew} alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Title and subtitle */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Grow your Business Exponentially!
          </h1>
          <p className="text-gray-600 text-sm">
            Pay less on each transaction you <br /> make with our App.
          </p>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8BAD2B]" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Button variant="link" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
        </div>

        {/* Terms text */}
        <p className="text-xs text-center text-gray-500">
          By clicking, you agree to our <br />
          <a href="#" className="text-[#8BAD2B] font-medium">Terms & Conditions</a> and{' '}
          <a href="#" className="text-[#8BAD2B] font-medium">Privacy Policy</a>.
        </p>
      </div>
    </Card>
  );
};

export default Login;
