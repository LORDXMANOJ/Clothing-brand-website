import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-6 px-6 mt-auto text-xs text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-800">Clothing Exchange & Swap Marketplace (Version 0.1)</p>
          <p>Built for the Unified Mentor Internship Program</p>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/marketplace" className="hover:underline">Marketplace</Link>
          <Link to="/upload" className="hover:underline">Swap Clothing</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
        <p>© 2026 Sustainable Fashion Initiative. All rights reserved.</p>
      </div>
    </footer>
  );
};
