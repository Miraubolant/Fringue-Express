import React from 'react';
import { Modal } from '../ui/Modal';
import { CartItem } from '../../types';
import { ShoppingBag, TrendingUp, Euro, Percent, Trash2, Tag } from 'lucide-react';
import { formatPrice, formatPercentage } from '../../utils/formatters';
import { cn } from '../../utils/styles';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (reference: string) => void;
}

export function CartModal({ isOpen, onClose, items, onRemoveItem }: CartModalProps) {
  const totalItems = items.length;

  const stats = items.reduce((acc, item) => {
    const margin = ((item.averagePrice - item.price) / item.price) * 100;
    const profit = item.averagePrice - item.price;
    const reduction = item.originalPrice - item.price;
    
    return {
      totalMargin: acc.totalMargin + margin,
      profitableItems: acc.profitableItems + (margin > 0 ? 1 : 0),
      totalProfit: acc.totalProfit + profit,
      totalArlettiePrice: acc.totalArlettiePrice + item.price,
      totalOriginalPrice: acc.totalOriginalPrice + item.originalPrice,
      totalReduction: acc.totalReduction + reduction
    };
  }, { 
    totalMargin: 0, 
    profitableItems: 0, 
    totalProfit: 0,
    totalArlettiePrice: 0,
    totalOriginalPrice: 0,
    totalReduction: 0
  });

  const averageMargin = totalItems > 0 ? stats.totalMargin / totalItems : 0;
  const reductionPercentage = stats.totalOriginalPrice > 0 
    ? (stats.totalReduction / stats.totalOriginalPrice) * 100 
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Analyse de sélection"
      className="bg-white dark:bg-navy-800 backdrop-blur-sm max-w-6xl"
    >
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-navy-900 dark:text-navy-100">
          {totalItems} article{totalItems > 1 ? 's' : ''} sélectionné{totalItems > 1 ? 's' : ''}
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <div className={cn(
            "rounded-lg p-4",
            averageMargin > 0 
              ? "bg-emerald-50 dark:bg-emerald-900/30" 
              : "bg-red-50 dark:bg-red-900/30"
          )}>
            <div className="flex items-center gap-2 text-sm text-navy-500 dark:text-navy-300">
              <Percent className={cn(
                "h-4 w-4",
                averageMargin > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )} />
              <span>Marge moyenne</span>
            </div>
            <div className={cn(
              "mt-1 text-2xl font-bold",
              averageMargin > 0 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-red-600 dark:text-red-400"
            )}>
              {formatPercentage(averageMargin)}
            </div>
          </div>

          <div className="bg-navy-50 dark:bg-navy-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-navy-500 dark:text-navy-300">
              <TrendingUp className="h-4 w-4" />
              <span>Articles rentables</span>
            </div>
            <div className="mt-1 text-2xl font-bold text-navy-900 dark:text-navy-100">
              {stats.profitableItems} / {totalItems}
            </div>
          </div>

          <div className="bg-navy-50 dark:bg-navy-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-navy-500 dark:text-navy-300">
              <ShoppingBag className="h-4 w-4" />
              <span>Total Arlettie</span>
              {reductionPercentage > 0 && (
                <span className="text-xs text-navy-400 dark:text-navy-500">
                  (-{formatPercentage(reductionPercentage)})
                </span>
              )}
            </div>
            <div className="mt-1">
              {reductionPercentage > 0 ? (
                <>
                  <div className="text-sm text-navy-400 dark:text-navy-500 line-through">
                    {formatPrice(stats.totalOriginalPrice)}
                  </div>
                  <div className="text-2xl font-bold text-navy-900 dark:text-navy-100">
                    {formatPrice(stats.totalArlettiePrice)}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold text-navy-900 dark:text-navy-100">
                  {formatPrice(stats.totalArlettiePrice)}
                </div>
              )}
            </div>
          </div>

          <div className={cn(
            "rounded-lg p-4",
            stats.totalProfit > 0 
              ? "bg-emerald-50 dark:bg-emerald-900/30" 
              : "bg-red-50 dark:bg-red-900/30"
          )}>
            <div className="flex items-center gap-2 text-sm text-navy-500 dark:text-navy-300">
              <Euro className={cn(
                "h-4 w-4",
                stats.totalProfit > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )} />
              <span>Bénéfice total</span>
            </div>
            <div className={cn(
              "mt-1 text-2xl font-bold",
              stats.totalProfit > 0 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-red-600 dark:text-red-400"
            )}>
              {formatPrice(stats.totalProfit)}
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50/80 dark:bg-navy-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-navy-500 dark:text-navy-300">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Article</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-navy-500 dark:text-navy-300">
                  <div className="flex items-center justify-end gap-2">
                    <Euro className="h-4 w-4" />
                    <span>Prix Arlettie</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-navy-500 dark:text-navy-300">
                  <div className="flex items-center justify-end gap-2">
                    <Euro className="h-4 w-4" />
                    <span>Prix marque</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-navy-500 dark:text-navy-300">
                  <div className="flex items-center justify-end gap-2">
                    <Euro className="h-4 w-4" />
                    <span>Prix moyen</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-navy-500 dark:text-navy-300">
                  <div className="flex items-center justify-end gap-2">
                    <Euro className="h-4 w-4" />
                    <span>Bénéfice</span>
                  </div>
                </th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-700">
              {items.map((item) => {
                const profit = item.averagePrice - item.price;
                
                return (
                  <tr key={item.reference} className="hover:bg-navy-50/50 dark:hover:bg-navy-700/50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-navy-900 dark:text-navy-100">{item.title}</span>
                        <span className="text-xs text-navy-500 dark:text-navy-400">{item.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      {item.price !== item.originalPrice ? (
                        <div>
                          <span className="text-navy-400 dark:text-navy-500 line-through mr-2">
                            {formatPrice(item.originalPrice)}
                          </span>
                          <span className="text-navy-600 dark:text-navy-300">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-navy-600 dark:text-navy-300">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-navy-600 dark:text-navy-300">
                      {formatPrice(item.brandPrice)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-navy-600 dark:text-navy-300">
                      {formatPrice(item.averagePrice)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "text-sm font-medium",
                        profit > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                      )}>
                        {formatPrice(profit)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onRemoveItem(item.reference)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                                 text-red-500 dark:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}