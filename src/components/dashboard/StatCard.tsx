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
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-400';
      case 'decrease':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">
            {name}
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
        </div>
        <div className="rounded-lg bg-gray-700/50 p-2.5">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
      </div>
      
      <div className="mt-4">
        <span className={`text-sm font-medium ${getChangeColor()}`}>
          {change}
        </span>
      </div>
    </div>
  );
};