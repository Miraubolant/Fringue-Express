import React from 'react';
import { ShoppingBag, Package, Store, ImageOff, ArrowUpDown } from 'lucide-react';
import { DataItem, SortConfig } from '../types';
import { formatPrice } from '../../../utils/format';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Pagination } from '../../../components/ui/Pagination';
import { useComparisonStore } from '../../../store/comparisonStore';

interface DataTableContentProps {
  items: DataItem[];
  loading: boolean;
  onSort: (key: string) => void;
  sortConfig: SortConfig;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataTableContent: React.FC<DataTableContentProps> = ({
  items,
  loading,
  onSort,
  sortConfig,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const { addItem, removeItem, isInComparison } = useComparisonStore();

  if (loading) return <LoadingSpinner />;

  const renderSortIcon = (column: string) => {
    if (sortConfig.key !== column) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return (
      <ArrowUpDown 
        className={`w-4 h-4 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} 
      />
    );
  };

  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'arlettie':
        return { icon: Package, label: 'Arlettie', colorClass: 'text-purple-400' };
      case 'vinted':
        return { icon: ShoppingBag, label: 'Vinted', colorClass: 'text-teal-400' };
      case 'vestiaire':
        return { icon: Store, label: 'Vestiaire', colorClass: 'text-orange-400' };
      default:
        return { icon: ShoppingBag, label: 'Autre', colorClass: 'text-gray-400' };
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="w-12 px-4 py-4"></th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                <button 
                  onClick={() => onSort('source')}
                  className="flex items-center gap-2 hover:text-white"
                >
                  Source {renderSortIcon('source')}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                <button 
                  onClick={() => onSort('title')}
                  className="flex items-center gap-2 hover:text-white"
                >
                  Article {renderSortIcon('title')}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                <button 
                  onClick={() => onSort('brand')}
                  className="flex items-center gap-2 hover:text-white"
                >
                  Marque {renderSortIcon('brand')}
                </button>
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                <button 
                  onClick={() => onSort('price')}
                  className="flex items-center gap-2 justify-end hover:text-white ml-auto"
                >
                  Prix {renderSortIcon('price')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {items.map((item) => {
              const sourceInfo = getSourceInfo(item.source);
              const Icon = sourceInfo.icon;
              const inComparison = isInComparison(item.source === 'arlettie' ? 'remise' : 'category', item.id);

              return (
                <tr 
                  key={`${item.source}-${item.id}`}
                  className={`
                    hover:bg-gray-700/30 transition-colors duration-200
                    ${inComparison ? 'bg-blue-500/10 hover:bg-blue-500/20' : ''}
                  `}
                >
                  <td className="px-4 py-4">
                    <button
                      onClick={() => {
                        if (inComparison) {
                          removeItem(item.source === 'arlettie' ? 'remise' : 'category', item.id);
                        } else {
                          addItem(item.source === 'arlettie' ? 'remise' : 'category', item);
                        }
                      }}
                      className={`
                        p-1.5 rounded-lg transition-colors
                        ${inComparison 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'}
                      `}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${sourceInfo.colorClass}`} />
                      <span className={`text-sm ${sourceInfo.colorClass}`}>
                        {sourceInfo.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center">
                              <span class="text-gray-400"><ImageOff class="w-6 h-6" /></span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{item.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.brand}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-white">
                      {formatPrice(item.price)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};