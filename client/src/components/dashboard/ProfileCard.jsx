import React from 'react';
import { User, MapPin, RefreshCw, Star, Mail } from 'lucide-react';

export const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white border border-gray-300 rounded p-5 text-xs text-gray-800 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
          alt={user.name}
          className="w-16 h-16 rounded-full border border-gray-300 object-cover"
        />
        <div>
          <h2 className="text-base font-bold text-gray-900">{user.name}</h2>
          <div className="flex items-center space-x-1 text-gray-600 text-[11px] mt-0.5">
            <Mail className="w-3 h-3" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 text-[11px] mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{user.location || 'New York, NY'}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-3 grid grid-cols-2 gap-2 text-center">
        <div className="border-r border-gray-200 pr-2">
          <p className="text-xs text-gray-500 font-semibold uppercase">Swaps Done</p>
          <p className="text-base font-bold text-gray-900">{user.swapsCompleted || 14}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase">Trust Rating</p>
          <p className="text-base font-bold text-gray-900 flex items-center justify-center space-x-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{user.rating || 4.9} / 5.0</span>
          </p>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700 mb-1">About Me</p>
        <p className="text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-200">
          {user.bio || 'Passionate about sustainable fashion and reducing garment waste.'}
        </p>
      </div>
    </div>
  );
};
