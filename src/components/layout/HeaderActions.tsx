import React from 'react';
import { Star, ShoppingCart, ArrowLeftRight } from 'lucide-react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCartStore } from '../../store/cartStore';
import { useComparisonStore } from '../../store/comparisonStore';

export const HeaderActions: React.FC = () => {
  const { getFavoritesCount } = useFavoritesStore();
  const { items: cartItems } = useCartStore();
  const { items: comparisonItems } = useComparisonStore();

  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors">
        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
        <span className="text-sm font-medium">{getFavoritesCount()} favoris</span>
      </button>

      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors">
        <ShoppingCart className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium">{cartItems.length} articles</span>
      </button>

      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors">
        <ArrowLeftRight className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium">{comparisonItems.length} comparaisons</span>
      </button>
    </div>
  );
};