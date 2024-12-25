import React from 'react';
import { ArrowLeftRight, Trash2 } from 'lucide-react';
import { useComparisonStore } from '../../store/comparisonStore';
import { SaveComparisonButton } from './SaveComparisonButton';
import { ComparisonDetails } from './ComparisonDetails';

export const ComparisonZone: React.FC = () => {
  const { items, clearComparison } = useComparisonStore();

  if (items.length === 0) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Comparaison d'articles</h3>
          <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
            {items.length} article{items.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SaveComparisonButton />
          <button
            onClick={clearComparison}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                     bg-red-500/10 hover:bg-red-500/20 
                     text-red-400 hover:text-red-300
                     border border-red-500/20 hover:border-red-500/30
                     transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Tout effacer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <ComparisonDetails key={`${item.type}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};