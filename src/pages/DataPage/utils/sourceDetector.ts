import { CategoryItem } from '../types';

export const getSourceFromItem = (item: CategoryItem | any): 'vinted' | 'vestiaire' | 'arlettie' => {
  if (!item.link) return 'arlettie';
  
  const url = item.link.toLowerCase();
  if (url.includes('vinted')) return 'vinted';
  if (url.includes('vestiairecollective')) return 'vestiaire';
  
  return 'arlettie';
};