import { PriceAnalysis } from '../types';

export const calculateDiscountedPrice = (price: number, discountPercentage: number | null): number => {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
};

export const calculateMargin = (priceBrand: number, priceArlettie: number, discountPercentage: number | null): number => {
  if (priceBrand <= 0) return 0;
  const discountedPrice = calculateDiscountedPrice(priceArlettie, discountPercentage);
  return ((priceBrand - discountedPrice) / priceBrand) * 100;
};

export const calculateSelectionStats = (items: PriceAnalysis[], discountPercentage: number | null) => {
  return items.reduce((acc, item) => {
    const discountedPrice = calculateDiscountedPrice(item.priceArlettie, discountPercentage);
    const margin = calculateMargin(item.priceBrand, item.priceArlettie, discountPercentage);
    
    return {
      totalArlettie: acc.totalArlettie + discountedPrice,
      totalOriginalArlettie: acc.totalOriginalArlettie + item.priceArlettie,
      totalBrand: acc.totalBrand + item.priceBrand,
      totalMargin: acc.totalMargin + margin,
      profitableCount: acc.profitableCount + (margin > 0 ? 1 : 0)
    };
  }, {
    totalArlettie: 0,
    totalOriginalArlettie: 0,
    totalBrand: 0,
    totalMargin: 0,
    profitableCount: 0
  });
};

export const sortItems = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  direction: 'ascending' | 'descending'
): T[] => {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
    return 0;
  });
};