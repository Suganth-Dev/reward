import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';


const stores = [
  {
    id: '1',
    name: 'Annapoorna Hotel',
    location: 'Sitra, Coimbatore',
    storeId: '12345',
    image: 'https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Annapoorna Hotel',
    location: 'L&T, Coimbatore',
    storeId: '22345',
    image: 'https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const StoreSelection = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState('1');

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleContinue = () => {
    // Handle store selection
    navigate("/dashboard");
    console.log('Selected store:', selectedStore);
  };

  return (
    <Card>
      <div className="p-8 flex flex-col gap-6">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Select Your Store</h1>
          <p className="text-gray-600">
            Your Number is connected with 2 stores
          </p>
        </div>

        <div className="space-y-4">
          {stores.map((store) => (
            <label
              key={store.id}
              className={`block p-4 rounded-lg border-2 transition-all cursor-pointer
                ${selectedStore === store.id 
                  ? 'border-[#8BAD2B] bg-[#f9f9e9]' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{store.name}</h3>
                  <p className="text-gray-600 text-sm">{store.location}</p>
                  <p className="text-gray-500 text-xs">Store ID: {store.storeId}</p>
                </div>
                <input
                  type="radio"
                  name="store"
                  value={store.id}
                  checked={selectedStore === store.id}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-5 h-5 text-[#8BAD2B] border-gray-300 focus:ring-[#8BAD2B]"
                />
              </div>
            </label>
          ))}
        </div>

        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default StoreSelection;
