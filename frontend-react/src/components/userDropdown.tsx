import { logoutUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/1');
  };

  return (
    <div className="relative group focus-within:block">
      {/* Avatar + Info */}
      <button className="flex items-center space-x-2 focus:outline-none">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600">
            John Doe
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Administrator
          </div>
        </div>
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-md hidden group-focus-within:block z-50">
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
