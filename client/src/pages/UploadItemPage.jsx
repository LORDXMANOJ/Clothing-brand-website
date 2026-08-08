import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { PlusCircle, Image, Tag, AlertCircle, HelpCircle, Info } from 'lucide-react';

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

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConditionGuide, setShowConditionGuide] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    const urlRegex = /^https?:\/\/.+/i;

    if (!formData.title || formData.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.brand || !formData.brand.trim()) {
      errors.brand = 'Brand is required';
    }

    if (!formData.description || formData.description.trim().length < 20) {
      errors.description = 'Description must be at least 20 characters long';
    }

    const val = Number(formData.estimatedValue);
    if (isNaN(val) || val <= 0) {
      errors.estimatedValue = 'Estimated value must be a positive number greater than 0';
    }

    if (!formData.imageUrl || !urlRegex.test(formData.imageUrl.trim())) {
      errors.imageUrl = 'Please enter a valid HTTP or HTTPS image URL';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const tagArray = formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [];
      await itemService.createItem({
        ...formData,
        estimatedValue: Number(formData.estimatedValue),
        images: [formData.imageUrl.trim()],
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

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Item Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Levi's Trucker Denim Jacket or Zara Midi Dress"
              className={`w-full border rounded p-2 text-xs focus:outline-none ${
                fieldErrors.title ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
              }`}
            />
            {fieldErrors.title && (
              <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Levi's, Nike, Zara, H&M, Uniqlo"
                className={`w-full border rounded p-2 text-xs focus:outline-none ${
                  fieldErrors.brand ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
                }`}
              />
              {fieldErrors.brand && (
                <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.brand}</p>
              )}
            </div>

            {/* Category */}
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
            {/* Size */}
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

            {/* Condition & Guide */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-gray-700">Condition</label>
                <button
                  type="button"
                  onClick={() => setShowConditionGuide(!showConditionGuide)}
                  className="text-gray-500 hover:text-gray-900 flex items-center space-x-1 text-[11px]"
                  title="View Condition Guide"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guide</span>
                </button>
              </div>

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

            {/* Estimated Value */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Est. Value ($)</label>
              <input
                type="number"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                className={`w-full border rounded p-2 text-xs focus:outline-none ${
                  fieldErrors.estimatedValue ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
                }`}
              />
              {fieldErrors.estimatedValue && (
                <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.estimatedValue}</p>
              )}
            </div>
          </div>

          {/* Condition Guide Info Card */}
          {showConditionGuide && (
            <div className="bg-gray-50 border border-gray-300 p-3 rounded text-[11px] text-gray-700 space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-gray-900 border-b border-gray-200 pb-1">
                <Info className="w-3.5 h-3.5 text-gray-600" />
                <span>Condition Definitions Guide</span>
              </div>
              <ul className="space-y-1 text-gray-600">
                <li><strong className="text-gray-800">Brand New with Tags:</strong> Never worn, original tags still attached.</li>
                <li><strong className="text-gray-800">Like New:</strong> Worn once or twice, immaculate condition with no flaws.</li>
                <li><strong className="text-gray-800">Gently Used:</strong> Worn a few times, minor normal wear but well cared for.</li>
                <li><strong className="text-gray-800">Fair Condition:</strong> Visible wear or minor cosmetic imperfections noted.</li>
              </ul>
            </div>
          )}

          {/* Image URL */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`w-full border rounded p-2 text-xs focus:outline-none ${
                fieldErrors.imageUrl ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
              }`}
            />
            {fieldErrors.imageUrl ? (
              <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.imageUrl}</p>
            ) : (
              <p className="text-[10px] text-gray-500 mt-1">
                Cloudinary integration placeholder: Enter direct image URL for v0.1 preview.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe fit, fabric composition, defect notes, or care instructions..."
              className={`w-full border rounded p-2 text-xs focus:outline-none ${
                fieldErrors.description ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
              }`}
            />
            {fieldErrors.description && (
              <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.description}</p>
            )}
          </div>

          {/* Tags */}
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
