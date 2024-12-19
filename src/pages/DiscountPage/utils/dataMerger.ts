import { PriceAnalysis, PriceLink } from '../types';

export const mergeAnalysisData = (
  priceAnalysis: PriceAnalysis[],
  priceLinks: PriceLink[]
): PriceAnalysis[] => {
  // Créer une Map pour regrouper les liens par référence
  const linksByRef = new Map<string, PriceLink[]>();
  
  priceLinks.forEach(link => {
    const links = linksByRef.get(link.reference) || [];
    links.push(link);
    linksByRef.set(link.reference, links);
  });

  // Fusionner les données
  return priceAnalysis.map(item => ({
    ...item,
    links: linksByRef.get(item.reference) || []
  }));
};