import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';

interface LogoProps {
  variant?: 'header' | 'sidebar';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header' }) => {
  const { isCollapsed } = useSidebarStore();
  
  // Don't show text in sidebar when collapsed
  const showText = variant === 'header' || !isCollapsed;

  return (
    <Link 
      to="/dashboard" 
      className={`
        flex items-center gap-3
        ${variant === 'sidebar' 
          ? 'px-4 h-16 border-b border-gray-700/50 bg-gray-800/70' 
          : 'py-4'
        }
      `}
    >
      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
        <ShoppingBag className="w-5 h-5 text-white" />
      </div>
      
      {showText && (
        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-bold text-white leading-none tracking-tight truncate">
            Fringue Express
          </h1>
          <span className="text-xs text-gray-400 font-medium truncate mt-0.5">
            Analyseur de prix
          </span>
        </div>
      )}
    </Link>
  );
};