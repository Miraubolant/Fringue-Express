import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Button } from './Button';

export const CartButton: React.FC = () => {
  const { items } = useCartStore();
  const itemCount = items.length;

  return (
    <Button
      variant="ghost"
      className="relative w-10 h-10 p-0"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};