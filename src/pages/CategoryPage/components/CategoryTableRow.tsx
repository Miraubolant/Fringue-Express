import React from 'react';
import { Trash2 } from 'lucide-react';
import { CategoryItem } from '../types';
import { formatPrice } from '../../../utils/format';
import { getStateLabel, getStateColor } from '../utils/excel/stateMapping';
import { LinkButton } from '../../../components/ui/LinkButton';

interface CategoryTableRowProps {
  item: CategoryItem;
  onDelete: (id: string) => void;
}

export const CategoryTableRow: React.FC<CategoryTableRowProps> = ({ item, onDelete }) => {
  return (
    <tr className="hover:bg-gray-700/20">
      <td className="px-6 py-4 text-sm text-white font-medium">{item.title}</td>
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
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {item.link ? (
            <LinkButton url={item.link} />
          ) : (
            <span className="text-sm text-gray-500">-</span>
          )}
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};