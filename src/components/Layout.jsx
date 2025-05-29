import React from 'react';
import { Outlet } from 'react-router-dom';
import { backgroundImage } from '../assets/background';
import back from "../assets/back.jpg"




const Layout = () => {

    
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-4 md:p-6"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{ backgroundColor: "#00000080" }}
        className="absolute inset-0 backdrop-blur-sm"
      ></div>
      <div className="relative z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
