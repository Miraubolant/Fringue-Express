import { normalizeString } from '../string';

export const findColumnValue = (row: any, possibleNames: string[]): string => {
  const normalizedNames = possibleNames.map(normalizeString);
  
  for (const key of Object.keys(row)) {
    const normalizedKey = normalizeString(key);
    if (normalizedNames.includes(normalizedKey)) {
      const value = row[key];
      return value !== undefined && value !== null ? value.toString() : '';
    }
  }
  
  return '';
};