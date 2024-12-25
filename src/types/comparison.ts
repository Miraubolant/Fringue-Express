import { RemiseItem } from './remise';
import { CategoryItem } from '../pages/CategoryPage/types';

export interface ComparisonItem {
  type: 'remise' | 'category';
  source: 'arlettie' | 'vinted' | 'vestiaire';
  item: RemiseItem | CategoryItem;
}

export interface SavedComparison {
  id: string;
  name: string;
  items: ComparisonItem[];
  createdAt: Date;
}