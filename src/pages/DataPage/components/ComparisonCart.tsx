import React, { useMemo } from 'react';
import { X, ArrowUpDown, ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';
import { useComparisonStore } from '../../../store/comparisonStore';
import { formatPrice, formatPercentage } from '../../../utils/format';
import { calculateMargin } from '../../../utils/calculations';

export const ComparisonCart: React.FC = () => {
  const { items, removeItem, clearComparison } = useComparisonStore();

  const stats = useMemo(() => {
    const totalArlettie = items
      .filter(i => i.type === 'remise')
      .reduce((sum, i) => sum + i.item.priceArlettie, 0);

    const totalSecondHand = items
      .filter(i => i.type === 'category')
      .reduce((sum, i) => sum + i.item.price, 0);

    const totalBenefit = totalSecondHand - totalArlettie;
    const margin = totalSecondHand > 0 ? (totalBenefit / totalSecondHand) * 100 : 0;

    return {
      totalArlettie,
      totalSecondHand,
      totalBenefit,
      margin
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Comparaison
            </h3>
            <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
              {items.length} article{items.length > 1 ? 's' : ''}
            </span>
          </div>
          
          <button
            onClick={clearComparison}
            className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Tout effacer
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Package className="w-4 h-4" />
              <span className="text-sm">Total Arlettie</span>
            </div>
            <div className="text-xl font-bold text-white">
              {formatPrice(stats.totalArlettie)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Total Seconde Main</span>
            </div>
            <div className="text-xl font-bold text-white">
              {formatPrice(stats.totalSecondHand)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Bénéfice Total</span>
            </div>
            <div className={`text-xl font-bold ${stats.totalBenefit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPrice(stats.totalBenefit)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Marge Moyenne</span>
            </div>
            <div className={`text-xl font-bold ${stats.margin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(stats.margin)}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const isRemise = item.type === 'remise';
            const id = isRemise ? item.item.reference : item.item.id;
            const Icon = isRemise ? Package : ShoppingCart;
            const price = isRemise ? item.item.priceArlettie : item.item.price;
            
            return (
              <div
                key={`${item.type}-${id}`}
                className="group relative bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:bg-gray-800/70 transition-all duration-200"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-4">
                  <button
                    onClick={() => removeItem(item.type, id)}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 mb-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${isRemise ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-medium ${isRemise ? 'text-purple-400' : 'text-blue-400'}`}>
                      {isRemise ? 'Arlettie' : 'Seconde Main'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white line-clamp-2" title={item.item.title}>
                      {item.item.title}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{item.item.brand}</span>
                      <span className="font-medium text-white">{formatPrice(price)}</span>
                    </div>
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