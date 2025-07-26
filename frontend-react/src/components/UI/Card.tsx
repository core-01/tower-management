import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  animation?: 'fade-in' | 'slide-up' | 'bounce-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = true,
  hover = true,
  animation = 'fade-in'
}) => {
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer' 
    : '';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${padding ? 'p-6' : ''} ${hoverClasses} animate-${animation} ${className}`}>
      {children}
    </div>
  );
};