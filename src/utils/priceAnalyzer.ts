import { ClothingItem, ShoppingLink, AnalysisResult, PriceSettings } from '../types';

export function calculateOptimalPrice(
  item: ClothingItem,
  links: ShoppingLink[],
  settings: PriceSettings
): number {
  const discountedPrice = item.arlettiePrice * (1 - settings.arlettieDiscount / 100);
  const competitorPrices = links.map(link => {
    const totalPrice = link.price + (link.shipping === 'Livraison gratuite' ? 0 : parseFloat(link.shipping));
    return totalPrice;
  });

  const minCompetitorPrice = Math.min(...competitorPrices);
  const suggestedPrice = minCompetitorPrice * 0.95; // 5% below lowest competitor

  // Ensure we meet minimum profit margin
  const minPrice = discountedPrice * (1 + settings.minProfitMargin / 100);
  
  return Math.max(suggestedPrice, minPrice);
}

export function analyzeProfitability(
  item: ClothingItem,
  links: ShoppingLink[],
  settings: PriceSettings
): {
  profitability: 'high' | 'medium' | 'low';
  reason: string;
  suggestedPrice: number;
  potentialProfit: number;
} {
  const discountedPrice = item.arlettiePrice * (1 - settings.arlettieDiscount / 100);
  const suggestedPrice = calculateOptimalPrice(item, links, settings);
  const potentialProfit = suggestedPrice - discountedPrice;
  const profitMargin = (potentialProfit / discountedPrice) * 100;

  let profitability: 'high' | 'medium' | 'low';
  let reason: string;

  if (profitMargin > 50) {
    profitability = 'high';
    reason = 'Marge très attractive';
  } else if (profitMargin > 25) {
    profitability = 'medium';
    reason = 'Marge correcte';
  } else {
    profitability = 'low';
    reason = 'Marge faible';
  }

  return {
    profitability,
    reason,
    suggestedPrice,
    potentialProfit
  };
}