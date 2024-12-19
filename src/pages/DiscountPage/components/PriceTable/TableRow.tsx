import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { PriceAnalysis } from '../../types';
import { formatPrice, formatPercentage } from '../../../../utils/format';
import { ExpandedDetails } from './ExpandedDetails';
import { useSelectionStore } from '../../../../store/selectionStore';
import { useDiscountStore } from '../../../../store/discountStore';

interface TableRowProps {
  item: PriceAnalysis;
}

export const TableRow: React.FC<TableRowProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem, removeItem, isSelected } = useSelectionStore();
  const { discountPercentage } = useDiscountStore();
  const selected = isSelected(item.reference);

  const getMarginClass = (margin: number) => {
    if (margin >= 50) return 'bg-green-500/10 text-green-400';
    if (margin >= 30) return 'bg-blue-500/10 text-blue-400';
    return 'bg-gray-500/10 text-gray-400';
  };

  const discountedPrice = discountPercentage 
    ? item.priceArlettie * (1 - discountPercentage / 100)
    : item.priceArlettie;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected) {
      removeItem(item.reference);
    } else {
      addItem(item);
    }
  };

  return (
    <>
      <tr 
        className={`
          transition-colors duration-200
          ${item.links?.length ? 'cursor-pointer' : ''}
          ${selected ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'hover:bg-gray-700/20'}
        `}
        onClick={() => item.links?.length && setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4 text-sm text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelect}
              className={`
                p-1.5 rounded-lg transition-all duration-200
                ${selected 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'}
              `}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {item.links?.length > 0 && (
                <div className="text-gray-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              )}
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-400">{item.reference}</div>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-white">{item.brand}</td>
        <td className="px-6 py-4 text-sm text-right">
          {discountPercentage ? (
            <div>
              <div className="font-medium text-green-400">{formatPrice(discountedPrice)}</div>
              <div className="text-xs text-gray-400 line-through">{formatPrice(item.priceArlettie)}</div>
            </div>
          ) : (
            <div className="font-medium text-white">{formatPrice(item.priceArlettie)}</div>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-white text-right">{formatPrice(item.priceBrand)}</td>
        <td className="px-6 py-4 text-sm text-white text-right">{formatPrice(item.googleAverage)}</td>
        <td className="px-6 py-4 text-sm text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarginClass(item.margin)}`}>
            {formatPercentage(item.margin)}
          </span>
        </td>
      </tr>

      {isExpanded && item.links && item.links.length > 0 && (
        <tr className={selected ? 'bg-blue-500/5' : 'bg-gray-800/30'}>
          <td colSpan={6} className="p-3">
            <ExpandedDetails links={item.links} />
          </td>
        </tr>
      )}
    </>
  );
};