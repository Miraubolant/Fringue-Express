import React from 'react';
import { ShoppingBag, Package } from 'lucide-react';
import { formatPrice } from '../../utils/format';

interface PlatformStats {
  platform: 'vinted' | 'vestiaire';
  averagePrice: number;
  itemCount: number;
  trend: number;
}

export const PlatformPrices: React.FC<{ data: PlatformStats[] }> = ({ data }) => {
  const getPlatformInfo = (platform: string) => {
    switch (platform) {
      case 'vinted':
        return {
          name: 'Vinted',
          icon: ShoppingBag,
          colorClass: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
        };
      case 'vestiaire':
        return {
          name: 'Vestiaire Collective',
          icon: Package,
          colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
        };
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-lg font-semibold text-white">Prix moyens par plateforme</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => {
            const info = getPlatformInfo(item.platform);
            if (!info) return null;
            const Icon = info.icon;
            
            return (
              <div 
                key={item.platform}
                className={`flex items-center gap-4 p-4 rounded-xl ${info.colorClass} hover:bg-opacity-20 transition-all duration-200`}
              >
                <div className="w-12 h-12 rounded-xl bg-opacity-20 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-300">{info.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-opacity-20">
                      {item.itemCount} articles
                    </span>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-lg font-semibold text-white">
                      {formatPrice(item.averagePrice)}
                    </p>
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded-lg
                      ${item.trend > 0 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'}
                    `}>
                      {item.trend > 0 ? '+' : ''}{item.trend}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};