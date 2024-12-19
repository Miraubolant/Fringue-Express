export interface PriceLink {
  reference: string;
  title: string;
  url: string;
  source: string;
  price?: number;
  originalPrice?: number;
  shipping?: string;
  shippingCost?: number | null;
  isFreeShipping?: boolean;
  scrapedAt?: string | null;
}

export interface PriceAnalysis {
  reference: string;
  title: string;
  brand: string;
  priceArlettie: number;
  priceBrand: number;
  googleAverage: number;
  margin: number;
  links?: PriceLink[];
}

export interface SortConfig {
  key: keyof PriceAnalysis;
  direction: 'ascending' | 'descending';
}

export interface FilterConfig {
  search: string;
  discountPercentage: number | null;
  brand: string | null;
}