export interface CategoryItem {
  id: string;
  title: string;
  brand: string;
  state: 'new_with_tag' | 'new_without_tag' | 'never_worn' | 'very_good' | 'good' | 'fair';
  material: string;
  color: string;
  price: number;
  link: string | null;
  status: string | null;
  source?: 'vinted' | 'vestiaire' | null;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface FilterState {
  search: string | null;
  brand: string | null;
  state: string | null;
  material: string | null;
  color: string | null;
  dateRange: DateRange;
  source: 'vinted' | 'vestiaire' | null;
}

export interface SortConfig {
  key: keyof CategoryItem;
  direction: 'ascending' | 'descending';
}