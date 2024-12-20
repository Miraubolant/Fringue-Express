export const detectSite = (url: string): string => {
  const normalizedUrl = url.toLowerCase();
  
  if (normalizedUrl.includes('vinted')) return 'Vinted';
  if (normalizedUrl.includes('vestiairecollective')) return 'Vestiaire Collective';
  if (normalizedUrl.includes('videdressing')) return 'Vide Dressing';
  if (normalizedUrl.includes('leboncoin')) return 'Leboncoin';
  
  return 'Autre';
};