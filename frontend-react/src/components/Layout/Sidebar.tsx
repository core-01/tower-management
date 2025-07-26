import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  Plus, 
  Search, 
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'All Towers', href: '/towers', icon: Radio },
  { name: 'Add Tower', href: '/towers/add', icon: Plus },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg animate-slide-in-left">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 animate-bounce-in">
        <div className="flex items-center space-x-2 group">
          <Radio className="h-8 w-8 text-blue-600 animate-float group-hover:animate-pulse transition-all duration-300" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Tower Management
          </span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 animate-glow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transform hover:translate-x-2 hover:scale-105'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md"
        >
          {theme === 'light' ? (
            <Moon className="mr-3 h-5 w-5 transition-transform duration-300 hover:rotate-180" />
          ) : (
            <Sun className="mr-3 h-5 w-5 transition-transform duration-300 hover:rotate-180 animate-pulse" />
          )}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </div>
  );
};