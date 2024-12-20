import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { RemiseItem } from '../../../types/remise';
import { formatPrice, formatPercentage } from '../../../utils/format';
import { calculateMargin, calculateDiscountedPrice } from '../utils/calculations';
import { useDiscountStore } from '../../../store/discountStore';
import { useCartStore } from '../../../store/cartStore';
import { CompetitorLinksList } from './CompetitorLinksList';

interface DiscountTableRowProps {
  item: RemiseItem;
  index: number;
}

export const DiscountTableRow: React.FC<DiscountTableRowProps> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { discountPercentage } = useDiscountStore();
  const { addItem, removeItem, isInCart } = useCartStore();
  
  const discountedPrice = calculateDiscountedPrice(item.priceArlettie, discountPercentage);
  const margin = calculateMargin(item.priceBrand, discountedPrice);
  const inCart = isInCart(item.reference);

  const getMarginColor = (margin: number) => {
    if (margin >= 50) return 'text-green-400 bg-green-500/10';
    if (margin >= 30) return 'text-blue-400 bg-blue-500/10';
    if (margin < 0) return 'text-red-400 bg-red-500/10';
    return 'text-gray-400 bg-gray-500/10';
  };

  const hasLinks = item.competitorLinks && item.competitorLinks.length > 0;

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      removeItem(item.reference);
    } else {
      addItem({...item, margin});
    }
  };

  return (
    <>
      <tr 
        onClick={() => hasLinks && setIsExpanded(!isExpanded)}
        className={`
          ${hasLinks ? 'cursor-pointer' : ''}
          ${inCart ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'hover:bg-gray-700/20'}
          transition-colors duration-200
        `}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCartClick}
              className={`
                p-1.5 rounded-lg transition-all duration-200
                ${inCart 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'}
              `}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {hasLinks && (
                <div className="text-gray-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              )}
              <div>
                <div className="text-sm text-white font-medium">{item.title}</div>
                <div className="text-xs text-gray-400">{item.reference}</div>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-300">{item.brand}</td>
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
        <td className="px-6 py-4 text-sm text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarginColor(margin)}`}>
            {formatPercentage(margin)}
          </span>
        </td>
      </tr>

      {isExpanded && hasLinks && (
        <tr className={inCart ? 'bg-blue-500/5' : 'bg-gray-800/30'}>
          <td colSpan={5} className="px-6 py-4">
            <CompetitorLinksList links={item.competitorLinks} />
          </td>
        </tr>
      )}
    </>
  );
};