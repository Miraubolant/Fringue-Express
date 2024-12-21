import { Timestamp } from 'firebase/firestore';

// Convertit un numéro de série Excel en date JavaScript
export const excelDateToJsDate = (excelDate: number): Date => {
  // Excel utilise le 1er janvier 1900 comme point de départ
  // et compte le nombre de jours depuis cette date
  const startDate = new Date(1900, 0, 1);
  const offsetDays = excelDate - 1; // Soustraire 1 car Excel compte à partir de 1
  const milliseconds = offsetDays * 24 * 60 * 60 * 1000;
  return new Date(startDate.getTime() + milliseconds);
};

export const formatExcelDate = (excelDate: number | string | Timestamp | null): string => {
  if (!excelDate) return '';

  let date: Date;

  if (typeof excelDate === 'number') {
    date = excelDateToJsDate(excelDate);
  } else if (excelDate instanceof Timestamp) {
    date = excelDate.toDate();
  } else if (typeof excelDate === 'string') {
    const numericDate = parseInt(excelDate, 10);
    if (isNaN(numericDate)) return excelDate;
    date = excelDateToJsDate(numericDate);
  } else {
    return '';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};