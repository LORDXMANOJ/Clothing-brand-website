import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by jacket, dress, hoodie, brand (Levi's, Nike, Zara)..."
        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs text-gray-900 bg-white focus:outline-none focus:border-gray-500"
      />
    </div>
  );
};
