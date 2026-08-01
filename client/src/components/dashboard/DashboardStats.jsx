import React from 'react';
import { Package, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export const DashboardStats = ({ stats }) => {
  const defaultStats = {
    activeListings: 4,
    pendingSwaps: 2,
    completedSwaps: 12,
    totalViews: 148,
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-gray-300 rounded p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Active Listings</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{data.activeListings}</p>
        </div>
        <Package className="w-6 h-6 text-gray-600" />
      </div>

      <div className="bg-white border border-gray-300 rounded p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Pending Swaps</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{data.pendingSwaps}</p>
        </div>
        <Clock className="w-6 h-6 text-amber-600" />
      </div>

      <div className="bg-white border border-gray-300 rounded p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Completed Swaps</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{data.completedSwaps}</p>
        </div>
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
      </div>

      <div className="bg-white border border-gray-300 rounded p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Views</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{data.totalViews}</p>
        </div>
        <RefreshCw className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  );
};
