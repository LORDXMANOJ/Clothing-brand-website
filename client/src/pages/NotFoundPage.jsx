import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="bg-white border border-gray-300 rounded p-12 text-center max-w-md mx-auto my-12 space-y-4 text-xs">
      <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
      <h1 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="text-gray-600">The requested routing URL does not exist on the Clothing Exchange marketplace platform.</p>
      <Link
        to="/"
        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded font-semibold inline-flex items-center space-x-1.5"
      >
        <Home className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
