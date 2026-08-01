import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { PlusCircle, Image, Tag, AlertCircle } from 'lucide-react';

export const UploadItemPage = () => {
  const [formData, setFormData] = useState({
    title: "Uniqlo AIRism Oversized Crewneck Sweatshirt",
    brand: 'Uniqlo',
    category: 'Tops',
    size: 'L',
    condition: 'Like New',
    gender: 'Unisex',
    description: 'Heavyweight AIRism cotton blend sweatshirt in muted olive green. Clean drop-shoulder fit.',
    estimatedValue: 45,
    imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    tags: 'uniqlo, airism, minimalist',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagArray = formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [];
      await itemService.createItem({
        ...formData,
        images: [formData.imageUrl],
        tags: tagArray,
      });
      navigate('/marketplace');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list clothing item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-xs text-gray-900">
      <div className="bg-white border border-gray-300 p-6 rounded space-y-4">
        <div className="border-b border-gray-200 pb-3">
          <h1 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-gray-700" />
            <span>Upload Clothing Item for Swap</span>
          </h1>
          <p className="text-gray-500">List an item from your closet to trade with other sustainable fashion members.</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Item Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Levi's Trucker Denim Jacket or Zara Midi Dress"
              className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Levi's, Nike, Zara, H&M, Uniqlo"
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Dresses">Dresses</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Activewear">Activewear</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="Shoes 8">Shoes 8</option>
                <option value="Shoes 9">Shoes 9</option>
                <option value="Shoes 10">Shoes 10</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none"
              >
                <option value="Brand New with Tags">Brand New with Tags</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Fair Condition">Fair Condition</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Est. Value ($)</label>
              <input
                type="number"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Cloudinary integration placeholder: Enter direct image URL for v0.1 preview.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe fit, fabric composition, defect notes, or care instructions..."
              className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. vintage, denim, streetstyle"
              className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-5 py-2 rounded font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
