export interface CompetitorLink {
  title: string;
  price: number;
  url: string;
  site: string;
}

export interface DiscountItem {
  reference: string;
  title: string;
  brand: string;
  category: string;
  priceArlettie: number;
  priceBrand: number;
  margin?: number;
  competitorLinks: CompetitorLink[];
}

export interface SortConfig {
  key: keyof DiscountItem;
  direction: 'ascending' | 'descending';
}

export interface FilterConfig {
  search: string;
  brand: string | null;
  category: string | null;
}