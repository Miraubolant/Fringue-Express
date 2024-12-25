import React from 'react';
import { Star, Trash2, ExternalLink, Package, ShoppingBag, Store } from 'lucide-react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { formatPrice } from '../../utils/format';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';

interface FavoriteItem {
  id: string;
  reference?: string;
  title: string;
  brand: string;
  price?: number;
  priceArlettie?: number;
  link?: string;
  source: 'arlettie' | 'vinted' | 'vestiaire';
}

export const FavoritesList: React.FC = () => {
  const { favorites, removeFavorite, isLoading } = useFavoritesStore();
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      if (favorites.length === 0) {
        setFavoriteItems([]);
        setLoading(false);
        return;
      }

      try {
        const [remiseSnapshot, categorySnapshot] = await Promise.all([
          getDocs(collection(db, 'remise_items')),
          getDocs(collection(db, 'category_items'))
        ]);

        const remiseItems = remiseSnapshot.docs
          .map(doc => ({
            ...doc.data(),
            id: doc.id,
            source: 'arlettie' as const
          }))
          .filter(item => favorites.includes(item.reference));

        const categoryItems = categorySnapshot.docs
          .map(doc => ({
            ...doc.data(),
            id: doc.id,
            source: (doc.data().link?.includes('vinted') ? 'vinted' : 'vestiaire') as 'vinted' | 'vestiaire'
          }))
          .filter(item => favorites.includes(item.id));

        setFavoriteItems([...remiseItems, ...categoryItems]);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteItems();
  }, [favorites]);

  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'arlettie':
        return { 
          icon: Package, 
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          hoverBg: 'hover:bg-purple-500/20',
          hoverBorder: 'hover:border-purple-500/30',
          label: 'Arlettie' 
        };
      case 'vinted':
        return { 
          icon: ShoppingBag, 
          color: 'text-teal-400',
          bg: 'bg-teal-500/10',
          border: 'border-teal-500/20',
          hoverBg: 'hover:bg-teal-500/20',
          hoverBorder: 'hover:border-teal-500/30',
          label: 'Vinted' 
        };
      case 'vestiaire':
        return { 
          icon: Store, 
          color: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          hoverBg: 'hover:bg-orange-500/20',
          hoverBorder: 'hover:border-orange-500/30',
          label: 'Vestiaire Collectif' 
        };
      default:
        return { 
          icon: Package, 
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20',
          hoverBg: 'hover:bg-gray-500/20',
          hoverBorder: 'hover:border-gray-500/30',
          label: 'Autre' 
        };
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (favoriteItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center ring-1 ring-gray-600/30 mb-4">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-400 text-center">
          Aucun article en favoris
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favoriteItems.map((item) => {
        const itemId = item.reference || item.id;
        const price = item.priceArlettie || item.price;
        const sourceInfo = getSourceInfo(item.source);
        const Icon = sourceInfo.icon;

        return (
          <div
            key={itemId}
            className={`
              group relative overflow-hidden rounded-xl
              ${sourceInfo.bg} border ${sourceInfo.border}
              ${sourceInfo.hoverBg} ${sourceInfo.hoverBorder}
              transition-all duration-300
              hover:shadow-lg hover:shadow-black/5
            `}
          >
            <div className="p-6">
              {/* En-tête avec source et actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${sourceInfo.color}`} />
                  <span className={`text-sm font-medium ${sourceInfo.color}`}>
                    {sourceInfo.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-200"
                      title="Voir l'article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => removeFavorite(itemId)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                    title="Retirer des favoris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Informations principales */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.brand}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="px-3 py-1.5 rounded-lg bg-gray-800/50">
                    <span className="text-lg font-medium text-white">
                      {formatPrice(price || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};