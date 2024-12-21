import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import { CartSelector } from '../../../components/cart/CartSelector';

export const CartActions: React.FC = () => {
  const [cartName, setCartName] = useState('');
  const { saveCurrentCart, isLoading } = useCartStore();

  const handleSave = async () => {
    if (!cartName.trim() || isLoading) return;
    await saveCurrentCart(cartName);
    setCartName('');
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={cartName}
          onChange={(e) => setCartName(e.target.value)}
          placeholder="Nom du panier..."
          className="h-9 px-3 rounded-lg bg-gray-800/50 border border-gray-700/50 
                   text-sm text-white placeholder-gray-400
                   focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          onClick={handleSave}
          disabled={!cartName.trim() || isLoading}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                   bg-blue-500/10 hover:bg-blue-500/20
                   text-blue-400 hover:text-blue-300
                   border border-blue-500/20 hover:border-blue-500/30
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
              <span className="text-sm">Sauvegarder</span>
            </>
          )}
        </button>
      </div>

      <CartSelector />
    </div>
  );
};