export interface CompetitorLink {
  title: string;
  price: number;
  url: string;
  site: string;
}

export interface RemiseItem {
  id?: string;
  reference: string;
  title: string;
  brand: string;
  priceArlettie: number;
  priceBrand: number;
  competitorLinks: CompetitorLink[];
  createdAt?: any;
  updatedAt?: any;
}

export interface SortConfig {
  key: keyof RemiseItem;
  direction: 'ascending' | 'descending';
}

export interface FilterConfig {
  search: string;
  brand: string | null;
}