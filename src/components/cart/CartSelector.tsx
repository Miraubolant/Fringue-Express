import React, { useState, useEffect, useRef } from 'react';
import { Save, Trash2, FolderOpen } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatDate } from '../../utils/format';

export const CartSelector: React.FC = () => {
  const { 
    saveCurrentCart, 
    loadCart, 
    deleteCart, 
    getSavedCarts,
    loadSavedCarts,
    isLoading 
  } = useCartStore();
  
  const [newCartName, setNewCartName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const savedCarts = getSavedCarts();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSavedCarts();
  }, [loadSavedCarts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (!newCartName.trim() || isLoading) return;
    await saveCurrentCart(newCartName);
    setNewCartName('');
    setIsOpen(false);
  };

  const handleLoad = (cartId: string) => {
    loadCart(cartId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
      >
        <FolderOpen className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">
          Paniers sauvegardés ({savedCarts.length})
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 p-4 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50">
          {/* Sauvegarder le panier actuel */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCartName}
              onChange={(e) => setNewCartName(e.target.value)}
              placeholder="Nom du panier..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50 text-sm text-white placeholder-gray-400"
            />
            <button
              onClick={handleSave}
              disabled={!newCartName.trim() || isLoading}
              className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Liste des paniers sauvegardés */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedCarts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-2">
                Aucun panier sauvegardé
              </p>
            ) : (
              savedCarts.map((cart) => (
                <div
                  key={cart.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">
                      {cart.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {cart.createdAt ? formatDate(cart.createdAt) : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoad(cart.id)}
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      title="Charger ce panier"
                    >
                      <FolderOpen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCart(cart.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      title="Supprimer ce panier"
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};