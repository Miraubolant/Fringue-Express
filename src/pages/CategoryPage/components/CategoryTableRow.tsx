import React from 'react';
import { Trash2, Star } from 'lucide-react';
import { CategoryItem } from '../types';
import { formatPrice } from '../../../utils/format';
import { getStateLabel, getStateColor } from '../utils/excel/stateMapping';
import { LinkButton } from '../../../components/ui/LinkButton';
import { useFavoritesStore } from '../../../store/favoritesStore';
import { truncateTitle } from '../../../utils/string';

interface CategoryTableRowProps {
  item: CategoryItem;
  onDelete: (id: string) => void;
}

export const CategoryTableRow: React.FC<CategoryTableRowProps> = ({ item, onDelete }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <tr className={`
      group hover:bg-gray-700/20 
      transition-colors duration-200
      ${favorite ? 'bg-yellow-500/5' : ''}
    `}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleFavoriteClick}
            className={`
              p-1.5 rounded-lg 
              transition-all duration-200
              ${favorite 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-yellow-500/20 hover:text-yellow-400'}
            `}
            title={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star 
              className="w-4 h-4 transition-transform duration-200"
              fill={favorite ? 'currentColor' : 'none'} 
            />
          </button>
          <div className="min-w-0">
            <div className="text-sm text-white font-medium truncate" title={item.title}>
              {truncateTitle(item.title)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.brand}</td>
      <td className="px-6 py-4 text-sm">
        <span className={`${getStateColor(item.state)}`}>
          {getStateLabel(item.state)}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.material}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.color}</td>
      <td className="px-6 py-4 text-sm text-right font-medium text-white">
        {formatPrice(item.price)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.status}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {item.link ? (
            <LinkButton url={item.link} />
          ) : (
            <span className="text-sm text-gray-500">-</span>
          )}
          <button
            onClick={handleDelete}
            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};