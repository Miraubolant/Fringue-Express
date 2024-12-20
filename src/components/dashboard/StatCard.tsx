import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  name,
  value,
  icon: Icon,
  change,
  changeType
}) => {
  const getIconColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-400 bg-green-500/10';
      case 'decrease':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-blue-400 bg-blue-500/10';
    }
  };

  return (
    <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10">
        <Icon className="w-full h-full" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor()}`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-400">
              {name}
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {value}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className={`
            text-sm font-medium px-2 py-1 rounded-lg
            ${getIconColor()}
          `}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};