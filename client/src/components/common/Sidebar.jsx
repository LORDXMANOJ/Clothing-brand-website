import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, RefreshCw, PlusCircle, User, Shield, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/swaps', label: 'Swap Requests', icon: RefreshCw },
    { to: '/upload', label: 'Upload Item', icon: PlusCircle },
    { to: '/profile', label: 'My Profile', icon: User },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', label: 'Admin Panel', icon: Shield });
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-300 min-h-[calc(100vh-61px)] p-4 text-sm">
      <div className="mb-4 pb-3 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded text-xs font-medium border ${
                  isActive
                    ? 'bg-gray-200 border-gray-400 text-gray-900 font-semibold'
                    : 'bg-white border-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-4 h-4 text-gray-600" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
