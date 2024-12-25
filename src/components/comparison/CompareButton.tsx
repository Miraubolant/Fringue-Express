import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { useComparisonStore } from '../../store/comparisonStore';

interface CompareButtonProps {
  type: 'remise' | 'category';
  item: any;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ type, item }) => {
  const { addItem, removeItem, isInComparison } = useComparisonStore();
  const itemId = type === 'remise' ? item.reference : item.id;
  const inComparison = isInComparison(type, itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inComparison) {
      removeItem(type, itemId);
    } else {
      addItem(type, item);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        p-1.5 rounded-lg transition-all duration-200
        ${inComparison 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'}
      `}
      title={inComparison ? "Retirer de la comparaison" : "Ajouter à la comparaison"}
    >
      <ArrowLeftRight className="w-4 h-4" />
    </button>
  );
};