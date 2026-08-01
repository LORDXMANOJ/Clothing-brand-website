import React, { useState, useEffect } from 'react';
import { swapService } from '../services/swapService';
import { useAuth } from '../context/AuthContext';
import { SwapCard } from '../components/swaps/SwapCard';
import { RefreshCw, Filter } from 'lucide-react';

export const SwapRequestsPage = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const { user } = useAuth();

  const fetchSwaps = async () => {
    setLoading(true);
    try {
      const data = await swapService.getSwaps();
      setSwaps(data.swaps || []);
    } catch (err) {
      console.error('Failed to load swap proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const handleUpdateStatus = async (swapId, newStatus) => {
    try {
      await swapService.updateStatus(swapId, newStatus);
      fetchSwaps();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredSwaps = swaps.filter((s) => {
    if (statusFilter === 'All') return true;
    return s.status === statusFilter;
  });

  return (
    <div className="space-y-6 text-xs text-gray-900">
      <div className="bg-white border border-gray-300 p-4 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-gray-700" />
            <span>Clothing Swap Requests</span>
          </h1>
          <p className="text-gray-500">Manage incoming swap proposals, evaluate offered garments, and coordinate exchanges.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none"
          >
            <option value="All">All Requests</option>
            <option value="pending">Pending Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-300 p-8 rounded text-center text-gray-500">
          Fetching swap proposals...
        </div>
      ) : filteredSwaps.length === 0 ? (
        <div className="bg-white border border-gray-300 p-8 rounded text-center text-gray-500 space-y-1">
          <p className="font-bold text-gray-800">No swap requests found under current filter.</p>
          <p className="text-[11px]">Propose a swap from the Marketplace to start exchanging clothing!</p>
        </div>
      ) : (
        <div>
          {filteredSwaps.map((swap) => (
            <SwapCard
              key={swap._id}
              swap={swap}
              currentUserId={user?._id || user?.id}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};
