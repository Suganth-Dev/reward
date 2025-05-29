import React from 'react'
import Header from '../Layout/Header'
import Navbar from '../Layout/Navbar'
import Action from './Action'

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex justify-center">
      {/* App layout constrained to 1440px */}
      <div className="w-full max-w-[1440px] bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="w-full">
          <Header />
        </div>

        {/* Main Section */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar for Desktop */}
          <div className="hidden md:block w-[240px] ">
            <Navbar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Navbar */}
            <div className="block md:hidden ">
              <Navbar />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
              <Action/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard