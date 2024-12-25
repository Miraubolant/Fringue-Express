import React, { useState, useRef, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useFavoritesStore } from '../../store/favoritesStore';

interface SaveFavoritesButtonProps {
  items: any[];
}

export const SaveFavoritesButton: React.FC<SaveFavoritesButtonProps> = ({ items }) => {
  const { addFavorite, isLoading } = useFavoritesStore();

  const handleSave = async () => {
    if (isLoading) return;
    
    // Sauvegarder chaque article en favoris
    for (const item of items) {
      const itemId = item.reference || item.id;
      await addFavorite(itemId);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading || items.length === 0}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                bg-yellow-500/10 hover:bg-yellow-500/20 
                text-yellow-400 hover:text-yellow-300
                border border-yellow-500/20 hover:border-yellow-500/30
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Sauvegarde...</span>
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          <span className="text-sm">Sauvegarder en favoris</span>
        </>
      )}
    </button>
  );
};