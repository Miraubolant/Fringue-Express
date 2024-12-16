import { AnalysisResult } from '../types';
import { calculateDiscountedPrice, calculateMargin } from './price';

export function filterResults(
  results: AnalysisResult[],
  filters: {
    price: string;
    sort: string;
    search: string;
  },
  arlettieDiscount: number
): AnalysisResult[] {
  return results.filter(result => {
    const discountedPrice = calculateDiscountedPrice(result.item.arlettiePrice, arlettieDiscount);
    const margin = calculateMargin(result.item.averageShoppingPrice, discountedPrice);

    // Filtre par prix
    if (filters.price) {
      const price = discountedPrice;
      switch (filters.price) {
        case '0-50':
          if (price < 0 || price > 50) return false;
          break;
        case '50-100':
          if (price <= 50 || price > 100) return false;
          break;
        case '100+':
          if (price <= 100) return false;
          break;
      }
    }

    return true;
  });
}