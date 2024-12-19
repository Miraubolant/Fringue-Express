export const parsePrice = (value: any): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  // Remove currency symbols, spaces, and replace comma with dot
  const cleanValue = value.toString()
    .replace(/[€$\s]/g, '')
    .replace(',', '.');
  
  const number = parseFloat(cleanValue);
  return isNaN(number) ? 0 : number;
};

export const parseShippingCost = (value: string): number | null => {
  if (!value) return null;
  const match = value.match(/\+\s*(\d+[.,]\d+)/);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return null;
};

export const isShippingFree = (value: string): boolean => {
  return value?.toLowerCase().includes('gratuite') || false;
};