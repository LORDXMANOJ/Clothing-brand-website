import React, { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import { swapService } from '../services/swapService';
import { useAuth } from '../context/AuthContext';
import { SearchBar } from '../components/listings/SearchBar';
import { FilterPanel } from '../components/listings/FilterPanel';
import { ListingCard } from '../components/listings/ListingCard';
import { Modal } from '../components/common/Modal';
import { RefreshCw, CheckCircle } from 'lucide-react';

export const MarketplacePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', brand: 'All', size: 'All', condition: 'All' });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Swap Offer Modal state
  const [targetItem, setTargetItem] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [selectedOfferedItemId, setSelectedOfferedItemId] = useState('');
  const [swapNote, setSwapNote] = useState('');
  const [swapSuccess, setSwapSuccess] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchItems = async (searchQuery = searchTerm, currentFilters = filters, currentPage = page) => {
    setLoading(true);
    try {
      const data = await itemService.getItems({
        search: searchQuery,
        category: currentFilters.category,
        brand: currentFilters.brand,
        size: currentFilters.size,
        condition: currentFilters.condition,
        page: currentPage,
        limit: 6,
      });
      setItems(data.items || []);
      setTotalPages(data.pages || 1);
      setTotalItems(data.total || (data.items || []).length);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchItems(searchTerm, filters, page);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, filters, page]);

  const handleReset = () => {
    const emptyFilters = { category: 'All', brand: 'All', size: 'All', condition: 'All' };
    setSearchTerm('');
    setPage(1);
    setFilters(emptyFilters);
  };

  const handleOpenSwapModal = async (item) => {
    setTargetItem(item);
    setSwapSuccess(false);
    setSwapNote('');
    // Load current user's listings to pick offered item
    try {
      const allData = await itemService.getItems();
      const myItems = (allData.items || []).filter(
        (i) => i.owner?._id === user?._id || i.owner === user?._id || i.owner?.name === user?.name
      );
      setUserItems(myItems);
      if (myItems.length > 0) setSelectedOfferedItemId(myItems[0]._id);
    } catch (err) {
      console.error('Error fetching user items for swap:', err);
    }
  };

  const handleSendSwapOffer = async (e) => {
    e.preventDefault();
    if (!selectedOfferedItemId) return;

    try {
      await swapService.createSwap({
        requestedItemId: targetItem._id,
        offeredItemId: selectedOfferedItemId,
        note: swapNote,
      });
      setSwapSuccess(true);
      setTimeout(() => {
        setTargetItem(null);
        setSwapSuccess(false);
      }, 1800);
    } catch (err) {
      console.error('Error sending swap request:', err);
    }
  };

  return (
    <div className="space-y-6 text-xs text-gray-900">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Clothing Marketplace</h1>
          <p className="text-gray-500">Discover pre-loved shirts, denim jackets, summer dresses, and hoodies for direct swap.</p>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column: Filter Panel */}
        <div className="md:col-span-1">
          <FilterPanel filters={filters} setFilters={setFilters} onReset={handleReset} />
        </div>

        {/* Right Column: Listing Cards */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-gray-600 font-semibold border-b border-gray-200 pb-2">
            <span>Showing {items.length} clothing items available</span>
            <span>Sorted by Recent</span>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-300 p-8 rounded text-center text-gray-500">
              Loading marketplace listings...
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white border border-gray-300 p-8 rounded text-center space-y-2">
              <p className="font-bold text-gray-800">No clothing items match your filters.</p>
              <button onClick={handleReset} className="text-gray-900 underline text-xs">
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <ListingCard
                  key={item._id}
                  item={item}
                  onOfferSwap={isAuthenticated ? handleOpenSwapModal : null}
                />
              ))}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-xs">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 px-3 py-1.5 rounded font-semibold text-gray-700"
              >
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => setPage(pNum)}
                    className={`px-3 py-1 rounded text-xs font-semibold border ${
                      pNum === page
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}
              </div>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 px-3 py-1.5 rounded font-semibold text-gray-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Swap Offer Modal */}
      <Modal isOpen={!!targetItem} onClose={() => setTargetItem(null)} title="Propose Clothing Swap">
        {targetItem && (
          <form onSubmit={handleSendSwapOffer} className="space-y-4 text-xs">
            {swapSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded text-center space-y-1">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold">Swap Proposal Sent!</p>
                <p className="text-[11px]">The owner will review your offer in their Swap Requests tab.</p>
              </div>
            ) : (
              <>
                <div className="bg-gray-50 border border-gray-200 p-3 rounded flex items-center space-x-3">
                  <img
                    src={targetItem.images?.[0]}
                    alt={targetItem.title}
                    className="w-14 h-14 object-cover border border-gray-300 rounded"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{targetItem.title}</p>
                    <p className="text-gray-500 text-[11px]">Brand: {targetItem.brand} | Size: {targetItem.size}</p>
                    <p className="text-gray-500 text-[11px]">Owner: {targetItem.owner?.name}</p>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Select Your Item to Offer in Exchange
                  </label>
                  {userItems.length === 0 ? (
                    <p className="text-rose-600 text-[11px]">
                      You don't have any active listings to offer. Please upload an item to your closet first.
                    </p>
                  ) : (
                    <select
                      value={selectedOfferedItemId}
                      onChange={(e) => setSelectedOfferedItemId(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none"
                    >
                      {userItems.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.title} ({item.brand} - {item.size})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Note for Owner (Optional)</label>
                  <textarea
                    rows={3}
                    value={swapNote}
                    onChange={(e) => setSwapNote(e.target.value)}
                    placeholder="Hi! I am really interested in swapping for this jacket. Let me know if you like my offer..."
                    className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setTargetItem(null)}
                    className="border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={userItems.length === 0}
                    className="bg-gray-900 text-white px-4 py-1.5 rounded font-semibold hover:bg-gray-800 disabled:opacity-50 flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Proposal</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
};
