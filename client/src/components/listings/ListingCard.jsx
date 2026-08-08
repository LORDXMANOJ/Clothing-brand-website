import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, MapPin, RefreshCw } from 'lucide-react';
import { CategoryIcon } from '../../utils/categoryIcons';

export const ListingCard = ({ item, onOfferSwap }) => {
  const getConditionBadgeStyle = (condition) => {
    switch (condition) {
      case 'Brand New with Tags':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Like New':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Gently Used':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Fair Condition':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-4 flex flex-col justify-between text-xs">
      <div>
        {/* Item Image & Badges */}
        <div className="w-full h-48 bg-gray-100 border border-gray-200 mb-3 overflow-hidden rounded-sm relative">
          <img
            src={item.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Color-coded condition badge */}
          <span
            className={`absolute top-2 right-2 border px-2 py-0.5 rounded text-[10px] uppercase font-bold shadow-sm ${getConditionBadgeStyle(
              item.condition
            )}`}
          >
            {item.condition}
          </span>
          {/* Est. Value tag badge */}
          <span className="absolute bottom-2 left-2 bg-gray-900/90 text-white px-2 py-0.5 rounded text-[10px] font-semibold border border-gray-700">
            Est. ${item.estimatedValue}
          </span>
        </div>

        {/* Brand & Category with Icon */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
          <span className="font-semibold text-gray-700 uppercase tracking-wide">{item.brand}</span>
          <span className="border border-gray-300 px-1.5 py-0.5 rounded bg-gray-50 flex items-center space-x-1">
            <CategoryIcon category={item.category} className="w-3 h-3 text-gray-600" />
            <span>{item.category}</span>
          </span>
        </div>

        {/* Title */}
        <Link to={`/items/${item._id}`} className="font-bold text-sm text-gray-900 hover:underline line-clamp-1 mb-1 block">
          {item.title}
        </Link>

        {/* Details snippet */}
        <p className="text-gray-600 line-clamp-2 mb-3">{item.description}</p>

        {/* Attribute badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded text-[11px]">
            Size: {item.size}
          </span>
          <span className="bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded text-[11px]">
            Gender: {item.gender}
          </span>
          {item.owner?.location && (
            <span className="bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span>{item.owner.location}</span>
            </span>
          )}
        </div>
      </div>

      {/* Owner Info & Actions */}
      <div className="pt-3 border-t border-gray-200 flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <img
            src={item.owner?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
            alt={item.owner?.name || 'Owner'}
            className="w-5 h-5 rounded-full border border-gray-300 object-cover"
          />
          <span className="text-[11px] font-medium text-gray-700">{item.owner?.name || 'Marcus Vance'}</span>
        </div>

        <div className="flex items-center space-x-1">
          <Link
            to={`/items/${item._id}`}
            className="border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-2.5 py-1 rounded text-[11px] font-medium"
          >
            Details
          </Link>
          {onOfferSwap && (
            <button
              onClick={() => onOfferSwap(item)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Swap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
