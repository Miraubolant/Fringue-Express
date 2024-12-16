import React from 'react';
import { cn } from '../../utils/styles';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700",
      "hover:shadow-md transition-shadow duration-200",
      className
    )}>
      {children}
    </div>
  );
}