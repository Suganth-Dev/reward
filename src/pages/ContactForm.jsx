import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import hand1 from '../assets/hand1.jpeg';
import successIcon from '../assets/successIcon.png';
import Card from '../components/Card';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    location: '',
    phoneNumber: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ownerName, shopName, location, phoneNumber } = formData;

    if (!ownerName || !shopName || !location || !phoneNumber) {
      toast.error('Please fill in all the fields');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <Card >
      <div className="min-h-screen box-border bg-white flex flex-col relative overflow-x-hidden w-full">
        <Header />

        <ToastContainer position="top-center" autoClose={3000} />

        {/* Hero Image */}
        <div className="relative w-full overflow-hidden">
        <div className="group overflow-hidden">
          <img
            src={hand1}
            alt="Contact"
            className="w-full h-auto object-cover aspect-[3/1] transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        {/* Success Modal */}
        {submitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg mx-4">
              <img
                src={successIcon}
                alt="Success"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-lg font-bold mb-2">
                Thanks For Submitting the Contact Form
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                We will get back to you shortly
              </p>
              <Button onClick={() => navigate('/contact-success')}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="max-w-md w-full mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Contact Form</h1>
            <p className="text-gray-500 text-sm mt-1">
              Fill the contact form, One of our
              <br />
              executives will reach out to you shortly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
            />
            <TextInput
              placeholder="Shop Name"
              value={formData.shopName}
              onChange={(e) =>
                setFormData({ ...formData, shopName: e.target.value })
              }
            />
            <TextInput
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <TextInput
              placeholder="Phone Number"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val) && val.length <= 10) {
                  setFormData({ ...formData, phoneNumber: val });
                }
              }}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>

          {/* Store Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center mt-8">
            <h2 className="text-xl font-bold mb-1">Enter Store details</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter details manually to
              <br />
              get started into REWARDIFY
            </p>
            <Button onClick={() => navigate('/store-info')}>Get Started</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactForm;
