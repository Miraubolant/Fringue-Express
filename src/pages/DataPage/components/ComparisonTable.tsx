import React from 'react';
import { ShoppingBag, Package, Store, ImageOff } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useComparisonStore } from '../../../store/comparisonStore';

interface ComparisonTableProps {
  remiseItems: any[];
  categoryItems: any[];
  loading: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  remiseItems,
  categoryItems,
  loading
}) => {
  const { addItem, removeItem, isInComparison } = useComparisonStore();

  if (loading) return <LoadingSpinner />;

  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'vinted':
        return { icon: ShoppingBag, label: 'Vinted', colorClass: 'text-teal-400' };
      case 'vestiaire':
        return { icon: Store, label: 'Vestiaire', colorClass: 'text-orange-400' };
      default:
        return { icon: Package, label: 'Arlettie', colorClass: 'text-purple-400' };
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Source</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Article</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Marque</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Prix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {remiseItems.map((item) => {
              const sourceInfo = getSourceInfo('arlettie');
              const Icon = sourceInfo.icon;
              const uniqueKey = `remise-${item.reference}-${item.id}`;

              return (
                <tr 
                  key={uniqueKey}
                  className="hover:bg-gray-700/30 transition-colors duration-200"
                >
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
                    <span className="text-sm text-white">{item.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.brand}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-white">
                      {formatPrice(item.priceArlettie)}
                    </span>
                  </td>
                </tr>
              );
            })}

            {categoryItems.map((item) => {
              const source = item.link?.includes('vinted') ? 'vinted' : 'vestiaire';
              const sourceInfo = getSourceInfo(source);
              const Icon = sourceInfo.icon;
              const uniqueKey = `category-${item.id}-${source}`;

              return (
                <tr 
                  key={uniqueKey}
                  className="hover:bg-gray-700/30 transition-colors duration-200"
                >
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
    </div>
  );
};