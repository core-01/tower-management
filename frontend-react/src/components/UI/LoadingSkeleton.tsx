import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  rows = 1 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 last:mb-0 animate-pulse-slow"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-pulse-slow" style={{ animationDelay: `${index * 0.1}s` }} />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-pulse-slow" style={{ animationDelay: `${index * 0.15}s` }} />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-pulse-slow" style={{ animationDelay: `${index * 0.2}s` }} />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse-slow" style={{ animationDelay: `${index * 0.25}s` }} />
        </div>
      ))}
    </div>
  );
};