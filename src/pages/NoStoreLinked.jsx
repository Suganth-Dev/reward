import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';


const NoStoreLinked = () => {
  const navigate = useNavigate();

  const handleRegisterStore = () => {
    navigate('/store-info');
  };

  const handleLoginDifferent = () => {
    navigate('/');
  };

  return (
    <Card>
      <div className="p-8 flex flex-col gap-6">
        
        
        <div className="bg-[#f9f9e9] rounded-full w-32 h-32 mx-auto flex items-center justify-center">
          <div className="text-[#8BAD2B]">
            <Store size={60} />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No stores are linked to <br></br>this account</h1>
          <p className="text-gray-600">
            Enter your account details correctly or <br></br>register your store with us
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={handleRegisterStore}>
            Register your store with us
          </Button>
          
          <Button variant="secondary" onClick={handleLoginDifferent}>
            <p  className="text-[#8BAD2B]">Login with different account</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoStoreLinked;
