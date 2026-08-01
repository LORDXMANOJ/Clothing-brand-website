import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

export const SwapCard = ({ swap, currentUserId, onUpdateStatus }) => {
  const isRequester = swap.requester?._id === currentUserId || swap.requester === currentUserId;
  const partner = isRequester ? swap.recipient : swap.requester;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-1"><CheckCircle className="w-3 h-3" /><span>Accepted</span></span>;
      case 'rejected':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-1"><XCircle className="w-3 h-3" /><span>Rejected</span></span>;
      case 'completed':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded text-[10px] font-semibold">Completed</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Pending</span></span>;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-4 text-xs mb-3">
      {/* Header info */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-600">
            {isRequester ? 'You requested a swap with' : 'Swap requested by'}:
          </span>
          <span className="font-bold text-gray-900">{partner?.name || 'Community Swap Partner'}</span>
        </div>
        <div>{getStatusBadge(swap.status)}</div>
      </div>

      {/* Exchange comparison columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 bg-gray-50 border border-gray-200 p-3 rounded">
        {/* Requested Item */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
            {isRequester ? 'Item You Want' : 'Your Item Requested'}
          </p>
          <div className="flex items-center space-x-3">
            <img
              src={swap.requestedItem?.images?.[0] || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80'}
              alt={swap.requestedItem?.title}
              className="w-12 h-12 object-cover border border-gray-300 rounded"
            />
            <div>
              <p className="font-bold text-gray-900 line-clamp-1">{swap.requestedItem?.title || "Levi's Denim Jacket"}</p>
              <p className="text-gray-600 text-[11px]">Brand: {swap.requestedItem?.brand || "Levi's"} | Size: {swap.requestedItem?.size || 'L'}</p>
            </div>
          </div>
        </div>

        {/* Offered Item */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
            {isRequester ? 'Item You Offered' : 'Item Offered to You'}
          </p>
          <div className="flex items-center space-x-3">
            <img
              src={swap.offeredItem?.images?.[0] || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=200&q=80'}
              alt={swap.offeredItem?.title}
              className="w-12 h-12 object-cover border border-gray-300 rounded"
            />
            <div>
              <p className="font-bold text-gray-900 line-clamp-1">{swap.offeredItem?.title || 'Zara Summer Dress'}</p>
              <p className="text-gray-600 text-[11px]">Brand: {swap.offeredItem?.brand || 'Zara'} | Size: {swap.offeredItem?.size || 'M'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Note & Location */}
      {swap.note && (
        <p className="text-gray-700 bg-amber-50 border border-amber-200 p-2 rounded text-[11px] mb-3">
          <strong>Note:</strong> "{swap.note}"
        </p>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="text-[11px] text-gray-500">
          Created: {new Date(swap.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center space-x-2">
          <Link
            to={`/chat/${swap._id}`}
            className="border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Negotiation Chat</span>
          </Link>

          {!isRequester && swap.status === 'pending' && onUpdateStatus && (
            <>
              <button
                onClick={() => onUpdateStatus(swap._id, 'accepted')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded text-xs font-semibold"
              >
                Accept Swap
              </button>
              <button
                onClick={() => onUpdateStatus(swap._id, 'rejected')}
                className="bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 px-3 py-1 rounded text-xs font-semibold"
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
