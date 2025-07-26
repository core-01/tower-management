import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity animate-fade-in" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-bounce-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 animate-slide-up">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-6 py-4 animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};