import React from 'react'
import Header from '../components/Header'
import { Phone, MessageCircle } from 'lucide-react';
import store_image from '../assets/store_image.png'
import Card from '../components/Card'

const ThanksFor = () => {
  return (
    <Card>
        <Header />
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
      
      {/* Illustration */}
      <img
        src={store_image}
        alt="Thanks Illustration"
        className="w-32 h-32 mb-6"
      />

      {/* Main Text */}
      <h1 className="text-2xl font-bold text-black mb-2">Thanks for the details</h1>
      <p className="text-gray-500 max-w-md">
        We're working to launch your store live in the market very soon.
        Once we are done with verification, we will send you the credentials.
      </p>

      {/* Contact Box */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-1">Contact Us</h2>
        <p className="text-sm text-gray-500 mb-4">For any enquiries contact us</p>

        <div className="space-y-3">
          <a
            href="tel:+1234567890"
            className="flex items-center justify-center gap-2 w-full border border-[#8BAD2B] text-[#8BAD2B] py-2 rounded-md font-medium hover:bg-[#f5faec] transition"
          >
            <Phone size={16} /> Contact via Call
          </a>
          <a
            href="https://wa.me/1234567890"
            className="flex items-center justify-center gap-2 w-full border border-[#8BAD2B] text-[#8BAD2B] py-2 rounded-md font-medium hover:bg-[#f5faec] transition"
            target="_blank" rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> Contact Via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </Card>
  )
}

export default ThanksFor
