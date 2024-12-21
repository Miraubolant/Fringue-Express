import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = '',
  maxHeight = '300px'
}) => {
  return (
    <div 
      className={`
        overflow-y-auto
        scrollbar-thin scrollbar-track-gray-800/50 
        scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500/50
        ${className}
      `}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};