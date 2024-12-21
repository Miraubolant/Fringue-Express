import { CategoryItem } from '../types';

export const detectSource = (url: string | null): 'vinted' | 'vestiaire' | null => {
  if (!url) return null;
  
  const normalizedUrl = url.toLowerCase();
  if (normalizedUrl.includes('vinted')) return 'vinted';
  if (normalizedUrl.includes('vestiairecollective')) return 'vestiaire';
  
  return null;
};

export const getSourceFromItem = (item: CategoryItem): 'vinted' | 'vestiaire' | null => {
  return detectSource(item.link);
};