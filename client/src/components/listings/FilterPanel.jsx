import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CategoryIcon } from '../../utils/categoryIcons';

export const FilterPanel = ({ filters, setFilters, onReset }) => {
  const categories = ['All', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Footwear', 'Accessories', 'Activewear'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Shoes 8', 'Shoes 9', 'Shoes 10'];
  const conditions = ['All', 'Brand New with Tags', 'Like New', 'Gently Used', 'Fair Condition'];
  const brands = ['All', "Levi's", 'Zara', 'Nike', 'H&M', 'Uniqlo', 'Adidas'];
  const locations = ['All', 'Brooklyn, NY', 'Austin, TX', 'Seattle, WA', 'New York, NY'];

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-4 text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-1.5 font-bold text-gray-900">
          <Filter className="w-4 h-4 text-gray-700" />
          <span>Filter Clothing</span>
        </div>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-900 flex items-center space-x-1 text-[11px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="flex items-center space-x-1.5 font-semibold text-gray-700 mb-1">
          {filters.category && filters.category !== 'All' && <CategoryIcon category={filters.category} className="w-3.5 h-3.5 text-gray-600" />}
          <span>Category</span>
        </label>
        <select
          value={filters.category || 'All'}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white text-gray-800 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Brand</label>
        <select
          value={filters.brand || 'All'}
          onChange={(e) => handleChange('brand', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white text-gray-800 focus:outline-none"
        >
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Size</label>
        <select
          value={filters.size || 'All'}
          onChange={(e) => handleChange('size', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white text-gray-800 focus:outline-none"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Condition</label>
        <select
          value={filters.condition || 'All'}
          onChange={(e) => handleChange('condition', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white text-gray-800 focus:outline-none"
        >
          {conditions.map((cond) => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Location / City</label>
        <select
          value={filters.location || 'All'}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white text-gray-800 focus:outline-none"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
