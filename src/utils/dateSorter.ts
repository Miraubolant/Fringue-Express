import { Timestamp } from 'firebase/firestore';

export const getDateValue = (dateString: string | number | null | Timestamp): number => {
  if (!dateString) return 0;

  if (dateString instanceof Timestamp) {
    return dateString.toMillis();
  }

  if (typeof dateString === 'number') {
    // Si c'est un timestamp
    if (dateString > 1000000) {
      return dateString;
    }
    // Conversion de la date Excel en timestamp
    const date = new Date(1900, 0, dateString - 1);
    return date.getTime();
  }

  // Essayer de parser la chaîne de date
  const timestamp = Date.parse(dateString);
  return isNaN(timestamp) ? 0 : timestamp;
};

export const formatDateForDisplay = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};