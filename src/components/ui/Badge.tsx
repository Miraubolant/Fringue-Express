import React from 'react';
import { cn } from '../../utils/styles';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
      {
        'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10': variant === 'success',
        'bg-red-50 text-red-700 ring-1 ring-red-600/10': variant === 'error',
        'bg-navy-50 text-navy-700 ring-1 ring-navy-600/10': variant === 'neutral',
      },
      className
    )}>
      {children}
    </span>
  );
}