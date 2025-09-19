import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './../Components/Navbar';
import Footer from '../Components/Footer';
 

const mainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
      {/* Navbar always at top */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <footer className="mt-auto w-full">
        <Footer />
      </footer>
    </div>
    );
};

export default mainLayout;