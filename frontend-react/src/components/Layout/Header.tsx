import React, { useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import UserDropdown from '../userDropdown'; // ✅ correct path & casing

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 animate-slide-up">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-lg">
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500 group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search towers... || Feature will be live soon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:shadow-lg focus:scale-[1.02]"
            />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-12">
            <Bell className="h-5 w-5 transition-transform duration-300 hover:animate-bounce" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          <UserDropdown /> {/* ✅ Final position for logout/profile */}
        </div>
      </div>
    </header>
  );
};
