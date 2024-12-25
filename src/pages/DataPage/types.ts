export interface FilterState {
  search: string;
  brand: string[] | null;
  source: string[] | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}