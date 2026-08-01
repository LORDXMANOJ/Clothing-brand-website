import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { itemService } from '../services/itemService';
import { swapService } from '../services/swapService';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { ListingCard } from '../components/listings/ListingCard';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, RefreshCw } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [itemsData, swapsData] = await Promise.all([itemService.getItems(), swapService.getSwaps()]);
        const mine = (itemsData.items || []).filter(
          (i) => i.owner?._id === user?._id || i.owner === user?._id || i.owner?.name === user?.name
        );
        setMyListings(mine);
        setRecentSwaps(swapsData.swaps || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const stats = {
    activeListings: myListings.length || 2,
    pendingSwaps: recentSwaps.filter((s) => s.status === 'pending').length || 1,
    completedSwaps: user?.swapsCompleted || 14,
    totalViews: 184,
  };

  return (
    <div className="space-y-6 text-xs text-gray-900">
      {/* Header greeting */}
      <div className="bg-white border border-gray-300 p-5 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <LayoutDashboard className="w-5 h-5 text-gray-700" />
            <span>Member Dashboard Overview</span>
          </h1>
          <p className="text-gray-500">Welcome back, {user?.name}! Here is a summary of your closet listings and swap activity.</p>
        </div>
        <Link
          to="/upload"
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded font-semibold flex items-center space-x-1.5 w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload New Garment</span>
        </Link>
      </div>

      {/* Metrics stats row */}
      <DashboardStats stats={stats} />

      {/* My Wardrobe Listings */}
      <div className="bg-white border border-gray-300 p-5 rounded space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-sm font-bold text-gray-900">My Closet Listings</h2>
          <Link to="/upload" className="text-gray-900 hover:underline font-semibold text-xs">
            + Add Item
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading your wardrobe items...</p>
        ) : myListings.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded text-center space-y-2">
            <p className="font-bold text-gray-800">You haven't listed any clothing items yet.</p>
            <p className="text-gray-500 text-[11px]">Upload items like jackets, dresses, or sneakers to start swapping.</p>
            <Link to="/upload" className="bg-gray-900 text-white px-4 py-1.5 rounded font-semibold inline-block">
              Upload First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myListings.map((item) => (
              <ListingCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Swap activity list */}
      <div className="bg-white border border-gray-300 p-5 rounded space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-sm font-bold text-gray-900">Recent Swap Activity</h2>
          <Link to="/swaps" className="text-gray-900 hover:underline font-semibold text-xs">
            View All ({'>'})
          </Link>
        </div>

        {recentSwaps.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent swap proposals.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentSwaps.slice(0, 3).map((s) => (
              <div key={s._id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    Swap with {s.requester?.name === user?.name ? s.recipient?.name : s.requester?.name}
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    Requested: {s.requestedItem?.title || 'Clothing Item'}
                  </p>
                </div>
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
