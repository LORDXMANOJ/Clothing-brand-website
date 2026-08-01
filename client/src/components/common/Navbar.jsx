import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw, PlusCircle, User, LogOut, Shield, MessageSquare, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-300 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center space-x-2 text-gray-900 font-bold text-lg tracking-tight">
          <RefreshCw className="w-5 h-5 text-gray-700" />
          <span>ClothingSwap v0.1</span>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link to="/marketplace" className="hover:text-gray-900">
            Marketplace
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/swaps" className="flex items-center space-x-1 hover:text-gray-900">
                <RefreshCw className="w-4 h-4" />
                <span>My Swaps</span>
              </Link>
              <Link to="/upload" className="flex items-center space-x-1 hover:text-gray-900">
                <PlusCircle className="w-4 h-4" />
                <span>Upload Item</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-1 hover:text-gray-900">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center space-x-1 text-amber-700 hover:text-amber-900 font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* User Auth Action Buttons */}
        <div className="flex items-center space-x-3 text-sm">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 text-gray-800 hover:text-black">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-full border border-gray-400 object-cover"
                />
                <span className="font-medium">{user?.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="border border-gray-400 bg-white hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded text-xs font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded text-xs font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
