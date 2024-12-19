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

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};