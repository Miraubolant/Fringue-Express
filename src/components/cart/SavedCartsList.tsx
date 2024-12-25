import React from 'react';
import { ShoppingCart, Trash2, Calendar, Package, ExternalLink } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/format';
import { useCartStore } from '../../store/cartStore';

export const SavedCartsList: React.FC = () => {
  const { savedCarts, deleteCart, loadCart } = useCartStore();

  if (savedCarts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center ring-1 ring-gray-600/30 mb-4">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-400 text-center">
          Aucun panier sauvegardé
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {savedCarts.map((cart) => (
        <div
          key={cart.id}
          className="group bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-xl border border-blue-500/20 hover:border-blue-500/30 overflow-hidden transition-all duration-300"
        >
          {/* En-tête du panier */}
          <div className="p-6 border-b border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{cart.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {formatDate(cart.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadCart(cart.id)}
                  className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                  title="Charger ce panier"
                >
                  <Package className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCart(cart.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Supprimer ce panier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Liste des articles */}
          <div className="p-4">
            <div className="space-y-3">
              {cart.items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate" title={item.title}>
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.brand}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-sm font-medium text-white">
                      {formatPrice(item.priceArlettie)}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {cart.items.length > 3 && (
                <div className="text-center py-2">
                  <span className="text-sm text-gray-400">
                    +{cart.items.length - 3} autre{cart.items.length - 3 > 1 ? 's' : ''} article{cart.items.length - 3 > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pied de carte */}
          <div className="px-6 py-4 border-t border-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Total articles
              </span>
              <span className="text-sm font-medium text-white">
                {cart.items.length}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};