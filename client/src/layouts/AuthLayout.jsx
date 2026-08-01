import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-900 font-bold text-xl">
          <RefreshCw className="w-6 h-6 text-gray-800" />
          <span>ClothingSwap v0.1</span>
        </Link>
        <p className="mt-2 text-xs text-gray-600">Unified Mentor Internship Project — Sustainable Clothing Exchange</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-gray-300 rounded sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
