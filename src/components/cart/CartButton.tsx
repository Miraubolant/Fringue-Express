import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export function CartButton({ itemCount, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg bg-navy-50 hover:bg-navy-100 
                 dark:bg-navy-800/50 dark:hover:bg-navy-700/50 transition-colors"
      aria-label="Voir le panier"
    >
      <ShoppingCart className="h-5 w-5 text-navy-600 dark:text-navy-300" />
      {itemCount > 0 && (
        <Badge 
          variant="success" 
          className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
        >
          {itemCount}
        </Badge>
      )}
    </button>
  );
}