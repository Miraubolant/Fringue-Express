import React from 'react';
import { ShoppingBag, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { CartItem } from '../../../types';
import { cn } from '../../../utils/styles';
import { formatPrice, formatPercentage } from '../../../utils/formatters';
import { calculateProfitability } from '../../../utils/price';
import { ShoppingLinks } from './ShoppingLinks';

interface TableRowProps {
  result: any;
  isExpanded: boolean;
  arlettieDiscount: number;
  onToggleExpand: (reference: string | null) => void;
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (reference: string) => void;
  isInCart: boolean;
}

export function TableRow({ 
  result, 
  isExpanded, 
  arlettieDiscount, 
  onToggleExpand, 
  onAddToCart,
  onRemoveFromCart,
  isInCart 
}: TableRowProps) {
  const handleToggleExpand = () => {
    onToggleExpand(isExpanded ? null : result.item.reference);
  };

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      onRemoveFromCart(result.item.reference);
    } else {
      const { discountedPrice } = calculateProfitability(
        result.item.averageShoppingPrice,
        result.item.arlettiePrice,
        arlettieDiscount
      );
      
      onAddToCart({
        reference: result.item.reference,
        title: result.item.title,
        price: discountedPrice,
        originalPrice: result.item.arlettiePrice,
        brandPrice: result.item.brandPrice,
        averagePrice: result.item.averageShoppingPrice
      });
    }
  };

  const { margin, discountedPrice } = calculateProfitability(
    result.item.averageShoppingPrice,
    result.item.arlettiePrice,
    arlettieDiscount
  );

  const hasLinks = result.shoppingLinks && result.shoppingLinks.length > 0;

  return (
    <>
      <tr
        onClick={handleToggleExpand}
        className={cn(
          "transition-colors cursor-pointer",
          "hover:bg-navy-50/50 dark:hover:bg-navy-700/30",
          isExpanded && "bg-navy-50/80 dark:bg-navy-700/50",
          isInCart && "bg-emerald-50/30 dark:bg-emerald-900/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30"
        )}
      >
        <td className="w-8 px-4 py-4">
          {hasLinks && (
            <div className="text-navy-400 dark:text-navy-500">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          )}
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-navy-900 dark:text-navy-100">
              {result.item.title}
            </div>
            <div className="text-xs text-navy-500 dark:text-navy-400 mt-1">
              {result.item.reference}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="text-sm">
            {arlettieDiscount > 0 ? (
              <>
                <span className="text-navy-400 dark:text-navy-500 line-through mr-2">
                  {formatPrice(result.item.arlettiePrice)}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-navy-600 dark:text-navy-300">
                {formatPrice(result.item.arlettiePrice)}
              </span>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-navy-600 dark:text-navy-300">
          {formatPrice(result.item.brandPrice)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-navy-600 dark:text-navy-300">
          {formatPrice(result.item.averageShoppingPrice)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <Badge variant={margin > 0 ? 'success' : 'error'}>
            {formatPercentage(margin)}
          </Badge>
        </td>
        <td className="w-16 px-4 py-4">
          <button
            onClick={handleCartAction}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isInCart 
                ? "bg-emerald-50 hover:bg-red-50 text-emerald-600 hover:text-red-600 dark:bg-emerald-900/20 dark:hover:bg-red-900/20 dark:text-emerald-400 dark:hover:text-red-400"
                : "bg-navy-50 hover:bg-navy-100 text-navy-600 dark:bg-navy-800/50 dark:hover:bg-navy-700/50 dark:text-navy-300"
            )}
            title={isInCart ? "Retirer de la sélection" : "Ajouter à la sélection"}
          >
            {isInCart ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        </td>
      </tr>
      {isExpanded && hasLinks && (
        <tr>
          <td colSpan={7} className="bg-navy-50/50 dark:bg-navy-800/50 px-4 py-4">
            <ShoppingLinks links={result.shoppingLinks} />
          </td>
        </tr>
      )}
    </>
  );
}