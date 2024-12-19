import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';

export const Logo: React.FC = () => {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25 transform transition-all duration-200 group-hover:scale-105">
        <ShoppingBag className="w-5 h-5 text-white" />
      </div>
      
      {!isCollapsed && (
        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-bold text-white leading-none tracking-tight truncate">
            Fringue Express
          </h1>
          <span className="text-xs text-gray-400 font-medium truncate">
            Analyseur de prix
          </span>
        </div>
      )}
    </div>
  );
};