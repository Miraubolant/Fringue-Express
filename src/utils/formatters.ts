/**
 * Formate un nombre en prix avec le symbole €
 */
export const formatPrice = (value: number): string => {
  return `${value.toFixed(2)} €`;
};

/**
 * Formate un nombre en pourcentage
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};