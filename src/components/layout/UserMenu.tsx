import React, { useState, useRef, useEffect } from 'react';
import { User, Star, ShoppingCart, ArrowLeftRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCartStore } from '../../store/cartStore';
import { useComparisonStore } from '../../store/comparisonStore';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { getFavoritesCount } = useFavoritesStore();
  const { savedCarts } = useCartStore();
  const { items: comparisonItems } = useComparisonStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
      >
        <User className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium">{user.email}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">
                  Connecté
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="p-2 space-y-2">
            {/* Favoris */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm text-yellow-400">
                {getFavoritesCount()} article{getFavoritesCount() !== 1 ? 's' : ''} en favoris
              </span>
            </div>

            {/* Paniers sauvegardés */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <ShoppingCart className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">
                {savedCarts.length} panier{savedCarts.length !== 1 ? 's' : ''} sauvegardé{savedCarts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Comparaisons */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <ArrowLeftRight className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">
                {comparisonItems.length} article{comparisonItems.length !== 1 ? 's' : ''} en comparaison
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};