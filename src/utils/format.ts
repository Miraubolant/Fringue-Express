export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};