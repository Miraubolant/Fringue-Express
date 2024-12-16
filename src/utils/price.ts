export function calculateDiscountedPrice(price: number, discount: number): number {
  return price * (1 - discount / 100);
}

export function calculateMargin(sellingPrice: number, costPrice: number): number {
  return ((sellingPrice - costPrice) / costPrice) * 100;
}

export function calculateProfitability(
  sellingPrice: number,
  costPrice: number,
  discount: number
): {
  margin: number;
  profit: number;
  discountedPrice: number;
} {
  const discountedPrice = calculateDiscountedPrice(costPrice, discount);
  const margin = calculateMargin(sellingPrice, discountedPrice);
  const profit = sellingPrice - discountedPrice;

  return {
    margin,
    profit,
    discountedPrice
  };
}