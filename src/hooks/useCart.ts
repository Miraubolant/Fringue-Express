import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      if (prev.some(i => i.reference === item.reference)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (reference: string) => {
    setItems(prev => prev.filter(item => item.reference !== reference));
  };

  const updatePrices = (arlettieDiscount: number) => {
    setItems(prev => prev.map(item => ({
      ...item,
      price: item.originalPrice * (1 - arlettieDiscount / 100)
    })));
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  return {
    items,
    isCartOpen,
    addToCart,
    removeFromCart,
    updatePrices,
    toggleCart,
    closeCart: () => setIsCartOpen(false)
  };
}