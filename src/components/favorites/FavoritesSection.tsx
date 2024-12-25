import React from 'react';
import { Star } from 'lucide-react';
import { FavoritesList } from './FavoritesList';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { useFavoritesStore } from '../../store/favoritesStore';

export const FavoritesSection: React.FC = () => {
  const { getFavoritesCount } = useFavoritesStore();
  const count = getFavoritesCount();

  const title = (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center ring-1 ring-yellow-500/30">
        <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
      </div>
      <div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Articles favoris
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {count} article{count !== 1 ? 's' : ''} en favoris
        </p>
      </div>
    </div>
  );

  return (
    <CollapsibleSection title={title}>
      <FavoritesList />
    </CollapsibleSection>
  );
};