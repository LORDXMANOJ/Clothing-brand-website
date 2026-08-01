import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-lg font-bold text-gray-900 text-center">Create New Account</h2>

      {error && (
        <div className="bg-rose-50 border border-rose-300 text-rose-800 p-2.5 rounded flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            placeholder="e.g. Julian Thorne"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            placeholder="julian@fashionexchange.org"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Account Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none focus:border-gray-500"
          >
            <option value="user font-normal">Community Swapper (Standard)</option>
            <option value="admin">Platform Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Account'}
        </button>
      </form>

      <div className="border-t border-gray-200 pt-3 text-center text-gray-600">
        Already registered?{' '}
        <Link to="/login" className="text-gray-900 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
