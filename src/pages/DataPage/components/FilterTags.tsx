import React from 'react';
import { X, Package, ShoppingBag, Store } from 'lucide-react';

interface FilterTagsProps {
  sourceTags: string[];
  brandTags: string[];
  onRemoveSource: (value: string) => void;
  onRemoveBrand: (value: string) => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  sourceTags,
  brandTags,
  onRemoveSource,
  onRemoveBrand
}) => {
  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'arlettie':
        return { icon: Package, color: 'purple', label: 'Arlettie' };
      case 'vinted':
        return { icon: ShoppingBag, color: 'teal', label: 'Vinted' };
      case 'vestiaire':
        return { icon: Store, color: 'orange', label: 'Vestiaire' };
      default:
        return { icon: Package, color: 'gray', label: source };
    }
  };

  if (sourceTags.length === 0 && brandTags.length === 0) return null;

  // Remove duplicates
  const uniqueSourceTags = Array.from(new Set(sourceTags));
  const uniqueBrandTags = Array.from(new Set(brandTags));

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueSourceTags.map(source => {
        const { icon: Icon, color, label } = getSourceInfo(source);
        return (
          <span
            key={source}
            className={`
              inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm
              bg-${color}-500/10 text-${color}-400
              border border-${color}-500/20
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
            <button
              onClick={() => onRemoveSource(source)}
              className="p-0.5 hover:bg-gray-700/50 rounded-md transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        );
      })}

      {uniqueBrandTags.map(brand => (
        <span
          key={brand}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm
                   bg-blue-500/10 text-blue-400
                   border border-blue-500/20"
        >
          <span>{brand}</span>
          <button
            onClick={() => onRemoveBrand(brand)}
            className="p-0.5 hover:bg-gray-700/50 rounded-md transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
};