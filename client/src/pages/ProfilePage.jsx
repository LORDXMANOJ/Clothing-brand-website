import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import API from '../services/api';
import { User, CheckCircle, AlertCircle } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Marcus Vance',
    location: user?.location || 'New York, NY',
    bio: user?.bio || 'Passionate about sustainable fashion and swapping pre-loved clothes.',
    avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(false);
    setError('');

    try {
      await API.put('/users/profile', formData);
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('clothing_swap_user', JSON.stringify(updatedUser));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-xs text-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Public Profile Card */}
        <div className="md:col-span-1">
          <ProfileCard user={user} />
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="md:col-span-2 bg-white border border-gray-300 p-6 rounded space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-base font-bold text-gray-900 flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-700" />
              <span>Edit Account Profile</span>
            </h1>
            <p className="text-gray-500">Update your public swapper details, location, and bio.</p>
          </div>

          {saved && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Location / City</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Austin, TX"
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Avatar Image URL</label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Bio / Swap Preferences</label>
              <textarea
                rows={4}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe your style preferences, preferred sizes, or swap interests..."
                className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-gray-900 text-white font-semibold px-5 py-2 rounded hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
