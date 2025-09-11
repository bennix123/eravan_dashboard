import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, BarChart3, Users, ShoppingCart, Wheat, Megaphone } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    // { path: '/admin', icon: Settings, label: 'Admin Panel' },
    { path: '/crops-data', icon: Wheat, label: 'Crops Data' },
    { path: '/buyer-requirements', icon: ShoppingCart, label: 'Buyer Requirements' },
    { path: '/users', icon: Users, label: 'User Management' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    // { path: '/ad-management', icon: Megaphone, label: 'Ad Management' }
  ];

  return (
    <nav className="bg-emerald-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-100">EravanAdmin</h1>
        <p className="text-emerald-300 text-sm">Dashboard</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};