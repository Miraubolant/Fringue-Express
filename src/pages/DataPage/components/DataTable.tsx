import React from 'react';
import { ShoppingBag, Package, Store, ImageOff } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Pagination } from '../../../components/ui/Pagination';
import { CompareButton } from '../../../components/comparison/CompareButton';

interface DataTableProps {
  items: any[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  items,
  loading,
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (loading) return <LoadingSpinner />;

  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'vinted':
        return { icon: ShoppingBag, label: 'Vinted', color: 'text-teal-400' };
      case 'vestiaire':
        return { icon: Store, label: 'Vestiaire', color: 'text-orange-400' };
      default:
        return { icon: Package, label: 'Arlettie', color: 'text-purple-400' };
    }
  };

  const detectSource = (item: any) => {
    if (item.priceArlettie) return 'arlettie';
    if (item.link?.includes('vinted')) return 'vinted';
    return 'vestiaire';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Source</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Article</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Marque</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Prix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {items.map((item) => {
              const source = detectSource(item);
              const sourceInfo = getSourceInfo(source);
              const Icon = sourceInfo.icon;
              const price = item.priceArlettie || item.price;
              const type = source === 'arlettie' ? 'remise' : 'category';

              return (
                <tr 
                  key={`${source}-${item.id}`}
                  className="hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <CompareButton type={type} item={item} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${sourceInfo.color}`} />
                      <span className={`text-sm ${sourceInfo.color}`}>
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
                          const fallback = document.createElement('div');
                          fallback.className = 'w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center';
                          fallback.innerHTML = '<span class="text-gray-400"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12" /></svg></span>';
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center">
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-white">{item.title}</p>
                      <p className="text-xs text-gray-400">
                        {type === 'remise' ? item.reference : item.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.brand}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-white">
                      {formatPrice(price)}
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