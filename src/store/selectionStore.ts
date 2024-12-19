import { create } from 'zustand';
import { PriceAnalysis } from '../types';

interface SelectionState {
  selectedItems: PriceAnalysis[];
  addItem: (item: PriceAnalysis) => void;
  removeItem: (reference: string) => void;
  clearSelection: () => void;
  isSelected: (reference: string) => boolean;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedItems: [],
  addItem: (item) => 
    set((state) => ({
      selectedItems: [...state.selectedItems, item]
    })),
  removeItem: (reference) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(item => item.reference !== reference)
    })),
  clearSelection: () => set({ selectedItems: [] }),
  isSelected: (reference) => 
    get().selectedItems.some(item => item.reference === reference)
}));