import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'
import Button from '../components/Button';
import Header from '../components/Header';
import hand1 from '../assets/hand1.jpeg'; // Hero image

const ContactSuccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Image */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
              <img
                src={hand1}
                alt="Contact"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                        onClick={handleBack}
                        className="absolute top-4 left-4 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition"
                      >
                        <ArrowLeft size={24} />
                      </button>
            </div>

      {/* Contact Form Title */}
      <div className="text-center mt-6 px-4">
        <h2 className="text-2xl font-bold">Contact Form</h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill the contact form, One of our <br>
          </br>executives will reach out to you shortly
        </p>
      </div>

      {/* Success Message */}
      <div className="max-w-md w-full mx-auto px-4 py-6 space-y-6">
        <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold mb-2">We have Received Your <br></br>Contact Form</h3>
          <p className="text-gray-600 text-sm">
            We will get back to you Shortly, If you have any quires contact us below
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-600 mb-4">For any enquiries contact us</p>
        <div className="flex flex-col gap-3">
  {/* Call Button */}
  <Button
    variant="outline"
    className="flex items-center justify-center gap-2 border-[#8BAD2B] text-[#8BAD2B] border rounded-md font-medium px-4 py-2 hover:bg-[#8BAD2B]/10 transition"
    onClick={() => window.location.href = 'tel:+1234567890'}
  >
    <Phone size={18} /> Contact via Call
  </Button>

  {/* WhatsApp Button */}
  <Button
    variant="outline"
    className="flex items-center justify-center gap-2 border-[#8BAD2B] text-[#8BAD2B] border rounded-md font-medium px-4 py-2 hover:bg-[#8BAD2B]/10 transition"
    onClick={() => window.location.href = 'https://wa.me/1234567890'}
  >
    <FaWhatsapp size={18} /> Contact Via WhatsApp
  </Button>
</div>

        </div>

        {/* Store Details */}
        <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Enter Store details</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter details manually to <br></br>get started into REWARDIFY
          </p>
          <Button onClick={() => navigate('/store-info')}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;