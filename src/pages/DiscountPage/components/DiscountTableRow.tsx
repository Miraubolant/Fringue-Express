import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart, ImageOff } from 'lucide-react';
import { RemiseItem } from '../../../types/remise';
import { formatPrice, formatPercentage } from '../../../utils/format';
import { calculateMargin, calculateDiscountedPrice } from '../utils/calculations';
import { useDiscountStore } from '../../../store/discountStore';
import { useCartStore } from '../../../store/cartStore';
import { CompetitorLinksList } from './CompetitorLinksList';
import { truncateTitle } from '../../../utils/string';

interface DiscountTableRowProps {
  item: RemiseItem;
  index: number;
  onImageClick: (src: string, alt: string) => void;
}

export const DiscountTableRow: React.FC<DiscountTableRowProps> = ({ 
  item, 
  index,
  onImageClick 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { discountPercentage } = useDiscountStore();
  const { addItem, removeItem, isInCart } = useCartStore();
  
  const discountedPrice = calculateDiscountedPrice(item.priceArlettie, discountPercentage);
  const margin = calculateMargin(item.priceBrand, discountedPrice);
  const inCart = isInCart(item.reference);
  const hasLinks = item.competitorLinks && item.competitorLinks.length > 0;

  const getMarginColor = (margin: number) => {
    if (margin >= 50) return 'text-green-400 bg-green-500/10';
    if (margin >= 30) return 'text-blue-400 bg-blue-500/10';
    if (margin < 0) return 'text-red-400 bg-red-500/10';
    return 'text-gray-400 bg-gray-500/10';
  };

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
          relative h-[72px] min-h-[72px]
          ${hasLinks ? 'cursor-pointer' : ''}
          ${inCart ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'hover:bg-gray-700/20'}
          transition-colors duration-200
        `}
      >
        {/* Article Column */}
        <td className="sticky left-0 z-20 px-6 py-4 w-[400px] bg-inherit">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCartClick}
              className={`
                p-1.5 rounded-lg flex-shrink-0 transition-all duration-200
                ${inCart 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'}
              `}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            {/* Image */}
            {item.imageUrl && !imageError ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(item.imageUrl!, item.title);
                }}
                className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 hover:ring-2 hover:ring-blue-500/50 transition-all duration-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </button>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <ImageOff className="w-6 h-6 text-gray-600" />
              </div>
            )}

            <div className="flex items-center gap-2 min-w-0">
              {hasLinks && (
                <div className="text-gray-400 flex-shrink-0">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-sm text-white font-medium truncate" title={item.title}>
                  {truncateTitle(item.title, 50)}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {item.reference}
                </div>
              </div>
            </div>
          </div>
        </td>

        {/* Rest of the columns remain unchanged */}
        <td className="sticky left-[400px] z-20 px-6 py-4 w-[140px] text-sm text-gray-300 bg-inherit border-l border-gray-700/50">
          {item.brand}
        </td>

        <td className="px-6 py-4 text-sm text-right w-[200px]">
          <div className="flex items-center justify-end gap-3">
            <div>
              {discountPercentage ? (
                <div className="space-y-1">
                  <div className="font-medium text-green-400">{formatPrice(discountedPrice)}</div>
                  <div className="text-xs text-gray-400 line-through">{formatPrice(item.priceArlettie)}</div>
                </div>
              ) : (
                <div className="font-medium text-white">{formatPrice(item.priceArlettie)}</div>
              )}
            </div>
            {discountPercentage && (
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-green-500/10 text-green-400 whitespace-nowrap">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </td>

        <td className="px-6 py-4 text-sm text-white text-right w-[180px]">
          {formatPrice(item.priceBrand)}
        </td>

        <td className="px-6 py-4 text-sm text-right w-[120px]">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getMarginColor(margin)}`}>
            {formatPercentage(margin)}
          </span>
        </td>
      </tr>

      {/* Expanded details */}
      {isExpanded && hasLinks && (
        <tr className={inCart ? 'bg-blue-500/5' : 'bg-gray-800/30'}>
          <td colSpan={5} className="p-3">
            <CompetitorLinksList links={item.competitorLinks} />
          </td>
        </tr>
      )}
    </>
  );
};