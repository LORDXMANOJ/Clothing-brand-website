import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('marcus@fashionexchange.org');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password, rememberMe });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-lg font-bold text-gray-900 text-center">Sign In to Account</h2>

      {error && (
        <div className="bg-rose-50 border border-rose-300 text-rose-800 p-2.5 rounded flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            placeholder="marcus@fashionexchange.org"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-gray-500"
            placeholder="••••••••"
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-gray-900 focus:ring-0"
            />
            <span className="font-medium text-gray-700">Remember me on this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="border-t border-gray-200 pt-3 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-gray-900 font-bold hover:underline">
          Register here
        </Link>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-2.5 rounded text-[11px] text-gray-500 space-y-1">
        <p className="font-semibold text-gray-700">Quick Test Credentials:</p>
        <p>Admin: marcus@fashionexchange.org / password123</p>
        <p>User: elena@fashionexchange.org / password123</p>
      </div>
    </div>
  );
};
