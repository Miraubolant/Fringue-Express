import React from 'react';
import { Package, ShoppingBag, Store, ExternalLink, Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import { ComparisonItem } from '../../types/comparison';
import { useComparisonStore } from '../../store/comparisonStore';

interface ComparisonDetailsProps {
  item: ComparisonItem;
}

export const ComparisonDetails: React.FC<ComparisonDetailsProps> = ({ item }) => {
  const { removeItem } = useComparisonStore();
  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'arlettie':
        return { icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10' };
      case 'vinted':
        return { icon: ShoppingBag, color: 'text-teal-400', bg: 'bg-teal-500/10' };
      case 'vestiaire':
        return { icon: Store, color: 'text-orange-400', bg: 'bg-orange-500/10' };
      default:
        return { icon: Package, color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
  };

  const sourceInfo = getSourceInfo(item.source);
  const Icon = sourceInfo.icon;
  const price = item.type === 'remise' ? item.item.priceArlettie : item.item.price;
  const itemId = item.type === 'remise' ? item.item.reference : item.item.id;

  const handleRemove = () => {
    removeItem(item.type, itemId);
  };

  return (
    <div className="group relative overflow-hidden bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500/30 transition-all duration-200">
      {/* En-tête avec la source */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600/30">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${sourceInfo.bg}`}>
            <Icon className={`w-4 h-4 ${sourceInfo.color}`} />
          </div>
          <span className={`font-medium ${sourceInfo.color}`}>
            {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {'link' in item.item && item.item.link && (
            <a
              href={item.item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-3 py-1.5 rounded-lg
                       bg-gradient-to-r from-blue-500/10 to-blue-600/10
                       hover:from-blue-500/20 hover:to-blue-600/20
                       text-blue-400 hover:text-blue-300
                       border border-blue-500/20 hover:border-blue-500/30
                       shadow-sm hover:shadow-md shadow-blue-500/5
                       transition-all duration-200 transform hover:scale-105"
            >
              <span className="text-sm font-medium">Voir l'article</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
            </a>
          )}

          <button
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            title="Retirer de la comparaison"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-200 line-clamp-2" title={item.item.title}>
              {item.item.title}
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              {item.type === 'remise' ? item.item.reference : item.item.id}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{item.item.brand}</span>
            <span className="text-sm font-medium text-white">{formatPrice(price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};