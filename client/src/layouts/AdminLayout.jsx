import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Shield } from 'lucide-react';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-6 text-xs text-amber-900 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center space-x-2">
          <Shield className="w-4 h-4 text-amber-700" />
          <span className="font-bold">ADMINISTRATION PORTAL</span>
          <span className="text-amber-700">• Platform Overview & Moderation Controls</span>
        </div>
      </div>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
