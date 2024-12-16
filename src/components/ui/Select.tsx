import React from 'react';
import { cn } from '../../utils/styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "rounded-lg text-sm px-3 py-2",
        "bg-navy-50 dark:bg-navy-800/50 border-none",
        "text-navy-700 dark:text-navy-200",
        "focus:ring-2 focus:ring-navy-500/20 dark:focus:ring-navy-400/20",
        "hover:bg-navy-100 dark:hover:bg-navy-700/50 transition-colors",
        className
      )}
      {...props}
    />
  );
}