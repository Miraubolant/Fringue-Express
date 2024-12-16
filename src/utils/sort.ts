import { AnalysisResult } from '../types';

export function sortResults(
  results: AnalysisResult[],
  field: string,
  direction: 'asc' | 'desc'
): AnalysisResult[] {
  return [...results].sort((a, b) => {
    let comparison = 0;
    
    switch (field) {
      case 'reference':
        comparison = a.item.reference.localeCompare(b.item.reference);
        break;
      case 'title':
        comparison = a.item.title.localeCompare(b.item.title);
        break;
      case 'arlettiePrice':
        comparison = a.item.arlettiePrice - b.item.arlettiePrice;
        break;
      case 'brandPrice':
        comparison = a.item.brandPrice - b.item.brandPrice;
        break;
      case 'averagePrice':
        comparison = a.item.averageShoppingPrice - b.item.averageShoppingPrice;
        break;
      case 'margin':
        comparison = a.profitMargin - b.profitMargin;
        break;
      default:
        comparison = 0;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}