import React from 'react';
import { formatPrice } from '../../../utils/format';
import { CompareButton } from '../../../components/comparison/CompareButton';

interface DataTableRowProps {
  item: any;
  type: 'remise' | 'category';
}

export const DataTableRow: React.FC<DataTableRowProps> = ({ item, type }) => {
  return (
    <tr className="hover:bg-gray-700/20 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <CompareButton type={type} item={item} />
          <div>
            <p className="text-sm text-white">{item.title}</p>
            <p className="text-xs text-gray-400">
              {type === 'remise' ? item.reference : item.id}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-300">{item.brand}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <span className="text-sm font-medium text-white">
          {formatPrice(type === 'remise' ? item.priceArlettie : item.price)}
        </span>
      </td>
    </tr>
  );
};