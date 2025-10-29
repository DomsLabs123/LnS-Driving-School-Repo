import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/GuestHeader';
import Footer from '@/components/Navbar/GuestFooter'
function GuestLayout() {
 
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <header>
          <Navbar />
        </header>
      <div>
        <Outlet />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default GuestLayout;
