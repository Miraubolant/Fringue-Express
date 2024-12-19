import { create } from 'zustand';

interface DiscountState {
  discountPercentage: number | null;
  setDiscountPercentage: (percentage: number | null) => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  discountPercentage: null,
  setDiscountPercentage: (percentage) => set({ discountPercentage: percentage })
}));