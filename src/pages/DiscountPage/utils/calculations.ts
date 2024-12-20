export const calculateDiscountedPrice = (price: number, discountPercentage: number | null): number => {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
};

export const calculateMargin = (priceBrand: number, priceArlettie: number): number => {
  if (priceBrand <= 0) return 0;
  return ((priceBrand - priceArlettie) / priceBrand) * 100;
};