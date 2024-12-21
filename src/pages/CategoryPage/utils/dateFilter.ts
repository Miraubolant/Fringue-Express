import { Timestamp } from 'firebase/firestore';

// Convertit une date Excel en timestamp JavaScript
const excelToTimestamp = (excelDate: number): number => {
  const date = new Date(1900, 0, excelDate - 1);
  return date.getTime();
};

// Normalise une date en timestamp minuit
export const normalizeDate = (date: Date | null): number | null => {
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

export const parseDate = (value: string | number | Timestamp | null): number | null => {
  if (!value) return null;

  // Cas Timestamp Firestore
  if (value instanceof Timestamp) {
    return normalizeDate(value.toDate());
  }

  // Cas nombre
  if (typeof value === 'number') {
    // Si c'est un timestamp
    if (value > 1000000000000) {
      return normalizeDate(new Date(value));
    }
    // Si c'est une date Excel
    return normalizeDate(new Date(excelToTimestamp(value)));
  }

  // Cas chaîne
  const numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    return parseDate(numericValue);
  }

  // Essayer de parser comme date standard
  const parsedDate = new Date(value);
  if (!isNaN(parsedDate.getTime())) {
    return normalizeDate(parsedDate);
  }

  return null;
};