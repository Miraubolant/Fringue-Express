import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { SavedCartsList } from './SavedCartsList';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { useCartStore } from '../../store/cartStore';

export const SavedCartsSection: React.FC = () => {
  const { savedCarts } = useCartStore();

  const title = (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30">
        <ShoppingCart className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Paniers sauvegardés
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {savedCarts.length} panier{savedCarts.length !== 1 ? 's' : ''} enregistré{savedCarts.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );

  return (
    <CollapsibleSection title={title}>
      <SavedCartsList />
    </CollapsibleSection>
  );
};