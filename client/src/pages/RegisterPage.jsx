import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  // Helper function to evaluate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '', percent: 0 };

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      return { score, label: 'Weak', color: 'bg-rose-500', textColors: 'text-rose-600', percent: 33 };
    } else if (score <= 3) {
      return { score, label: 'Medium', color: 'bg-amber-500', textColors: 'text-amber-600', percent: 66 };
    } else {
      return { score, label: 'Strong', color: 'bg-emerald-500', textColors: 'text-emerald-600', percent: 100 };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
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

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Full Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded p-2 text-xs focus:outline-none ${
              fieldErrors.name ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
            }`}
            placeholder="e.g. Julian Thorne"
          />
          {fieldErrors.name && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded p-2 text-xs focus:outline-none ${
              fieldErrors.email ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
            }`}
            placeholder="julian@fashionexchange.org"
          />
          {fieldErrors.email && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded p-2 text-xs focus:outline-none ${
              fieldErrors.password ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
            }`}
            placeholder="At least 6 characters"
          />
          {fieldErrors.password && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.password}</p>
          )}

          {/* Password Strength Indicator & Progress Bar */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-medium">Password Strength:</span>
                <span className={`font-bold ${passwordStrength.textColors}`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded p-2 text-xs focus:outline-none ${
              fieldErrors.confirmPassword ? 'border-rose-400 bg-rose-50/50' : 'border-gray-300 focus:border-gray-500'
            }`}
            placeholder="Re-enter your password"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Role Selector */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Account Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-xs bg-white focus:outline-none focus:border-gray-500"
          >
            <option value="user">Community Swapper (Standard)</option>
            <option value="admin">Platform Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded hover:bg-gray-800 disabled:opacity-50 mt-2"
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
