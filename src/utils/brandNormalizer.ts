import { normalizeString } from './string';

// Map of known brand variations to their canonical forms
const BRAND_ALIASES: Record<string, string> = {
  'montblanc': 'Montblanc',
  'mont blanc': 'Montblanc',
  'yves saint laurent': 'Saint Laurent',
  'ysl': 'Saint Laurent',
  'louis vuitton': 'Louis Vuitton',
  'lv': 'Louis Vuitton',
  // Add more brand aliases as needed
};

export const normalizeBrandName = (brand: string): string => {
  // Normalize the input brand name
  const normalizedInput = normalizeString(brand);
  
  // Check if we have a known canonical form for this brand
  const canonicalBrand = BRAND_ALIASES[normalizedInput];
  if (canonicalBrand) {
    return canonicalBrand;
  }

  // If no alias is found, return the original with proper capitalization
  return brand.trim();
};

export const areSameBrand = (brand1: string, brand2: string): boolean => {
  const normalized1 = normalizeString(brand1);
  const normalized2 = normalizeString(brand2);
  return normalized1 === normalized2;
};