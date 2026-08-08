import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { swapService } from '../services/swapService';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/common/Modal';
import { RefreshCw, MapPin, Tag, ArrowLeft, ShieldCheck, Star, Eye } from 'lucide-react';

export const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [selectedOfferedId, setSelectedOfferedId] = useState('');
  const [swapNote, setSwapNote] = useState('');
  const [swapSuccess, setSwapSuccess] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const data = await itemService.getItemById(id);
        setItem(data.item);
        if (data.item?.images?.[0]) setActiveImage(data.item.images[0]);
      } catch (err) {
        console.error('Failed to load item:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleOpenSwapModal = async () => {
    setIsModalOpen(true);
    try {
      const allData = await itemService.getItems();
      const myItems = (allData.items || []).filter(
        (i) => i.owner?._id === user?._id || i.owner === user?._id || i.owner?.name === user?.name
      );
      setUserItems(myItems);
      if (myItems.length > 0) setSelectedOfferedId(myItems[0]._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendSwapOffer = async (e) => {
    e.preventDefault();
    if (!selectedOfferedId) return;

    try {
      await swapService.createSwap({
        requestedItemId: item._id,
        offeredItemId: selectedOfferedId,
        note: swapNote,
      });
      setSwapSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSwapSuccess(false);
        navigate('/swaps');
      }, 1500);
    } catch (err) {
      console.error('Error initiating swap:', err);
    }
  };

  if (loading) {
    return <div className="bg-white border border-gray-300 p-8 rounded text-center text-xs text-gray-500">Loading item specifications...</div>;
  }

  if (!item) {
    return (
      <div className="bg-white border border-gray-300 p-8 rounded text-center space-y-3 text-xs">
        <p className="font-bold text-gray-800 text-sm">Listing Not Found</p>
        <Link to="/marketplace" className="text-gray-900 underline font-semibold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-xs text-gray-900">
      {/* Back button */}
      <Link to="/marketplace" className="inline-flex items-center space-x-1 text-gray-700 hover:text-black font-semibold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="bg-white border border-gray-300 rounded p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images section */}
        <div className="space-y-3">
          <div className="w-full h-80 bg-gray-100 border border-gray-300 rounded overflow-hidden">
            <img src={activeImage} alt={item.title} className="w-full h-full object-cover" />
          </div>
          {item.images?.length > 1 && (
            <div className="flex space-x-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 border rounded overflow-hidden ${
                    activeImage === img ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-300 opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-gray-500 text-[11px]">{item.brand}</span>
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1 text-gray-500 text-[11px]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{item.views || 0} views</span>
                </span>
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                  {item.condition}
                </span>
              </div>
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 mt-1">{item.title}</h1>
          </div>

          <div className="border-t border-b border-gray-200 py-3 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div>
              <span className="text-gray-500 block">Category</span>
              <span className="font-bold text-gray-800">{item.category}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Size</span>
              <span className="font-bold text-gray-800">{item.size}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Est. Value</span>
              <span className="font-bold text-gray-800">${item.estimatedValue}</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-1">Description</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded border border-gray-200">{item.description}</p>
          </div>

          {item.tags?.length > 0 && (
            <div className="flex items-center space-x-1.5 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-gray-500" />
              {item.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[10px]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Owner details box */}
          <div className="bg-gray-50 border border-gray-300 p-3 rounded flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={item.owner?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={item.owner?.name || 'Owner'}
                className="w-10 h-10 rounded-full border border-gray-400 object-cover"
              />
              <div>
                <p className="font-bold text-gray-900">{item.owner?.name || 'Marcus Vance'}</p>
                <p className="text-gray-500 text-[10px] flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.owner?.location || 'New York, NY'}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-gray-500 uppercase">Trust Score</p>
              <p className="font-bold text-gray-900 flex items-center justify-end space-x-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{item.owner?.rating || 4.9}</span>
              </p>
            </div>
          </div>

          {/* Action button */}
          {isAuthenticated ? (
            <button
              onClick={handleOpenSwapModal}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Propose Swap For This Item</span>
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-300 p-3 rounded text-center">
              <p className="text-amber-900 mb-2">Please log in to make a swap offer for this clothing item.</p>
              <Link to="/login" className="bg-gray-900 text-white px-4 py-1.5 rounded font-semibold inline-block">
                Log In to Swap
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Swap Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Propose Swap">
        <form onSubmit={handleSendSwapOffer} className="space-y-4 text-xs">
          {swapSuccess ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded text-center">
              <p className="font-bold">Swap proposal submitted successfully!</p>
              <p className="text-[11px]">Redirecting to your Swaps dashboard...</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Choose Item to Offer in Exchange</label>
                {userItems.length === 0 ? (
                  <p className="text-rose-600">No active listings available. Please upload an item first.</p>
                ) : (
                  <select
                    value={selectedOfferedId}
                    onChange={(e) => setSelectedOfferedId(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                  >
                    {userItems.map((uItem) => (
                      <option key={uItem._id} value={uItem._id}>
                        {uItem.title} ({uItem.brand} - {uItem.size})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Note (Optional)</label>
                <textarea
                  rows={3}
                  value={swapNote}
                  onChange={(e) => setSwapNote(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Offer notes or shipping questions..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-300 px-3 py-1.5 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={userItems.length === 0}
                  className="bg-gray-900 text-white px-4 py-1.5 rounded font-semibold disabled:opacity-50"
                >
                  Confirm Proposal
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};
