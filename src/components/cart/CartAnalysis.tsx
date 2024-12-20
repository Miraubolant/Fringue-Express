import React from 'react';
import { ShoppingCart, X, TrendingUp, Package, DollarSign } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useDiscountStore } from '../../store/discountStore';
import { formatPrice, formatPercentage } from '../../utils/format';
import { calculateDiscountedPrice, calculateMargin } from '../../pages/DiscountPage/utils/calculations';

export const CartAnalysis: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const { discountPercentage } = useDiscountStore();

  if (items.length === 0) return null;

  const stats = items.reduce((acc, item) => {
    const discountedPrice = calculateDiscountedPrice(item.priceArlettie, discountPercentage);
    const margin = calculateMargin(item.priceBrand, discountedPrice);
    
    return {
      totalArlettie: acc.totalArlettie + discountedPrice,
      totalOriginalArlettie: acc.totalOriginalArlettie + item.priceArlettie,
      totalBrand: acc.totalBrand + item.priceBrand,
      totalMargin: acc.totalMargin + margin,
      profitableCount: acc.profitableCount + (margin > 0 ? 1 : 0)
    };
  }, {
    totalArlettie: 0,
    totalOriginalArlettie: 0,
    totalBrand: 0,
    totalMargin: 0,
    profitableCount: 0
  });

  const averageMargin = stats.totalMargin / items.length;
  const totalBenefit = stats.totalBrand - stats.totalArlettie;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Analyse du lot
            </h3>
            <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
              {items.length} articles sélectionnés
            </span>
            {discountPercentage && (
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                -{discountPercentage}% Arlettie
              </span>
            )}
          </div>
          
          <button
            onClick={clearCart}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Marge moyenne</span>
            </div>
            <div className={`text-2xl font-bold ${
              averageMargin >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatPercentage(averageMargin)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Package className="w-5 h-5" />
              <span className="text-sm font-medium">Total Arlettie</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {formatPrice(stats.totalArlettie)}
              </div>
              {discountPercentage && (
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(stats.totalOriginalArlettie)}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm font-medium">Total Marque</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(stats.totalBrand)}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Bénéfice total</span>
            </div>
            <div className={`text-2xl font-bold ${
              totalBenefit >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatPrice(totalBenefit)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};