// Fusionner toutes les fonctions d'aide Excel ici
export const normalizeColumnName = (name: string): string => {
  return name.toString().toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
};

export const findColumnValue = (row: any, possibleNames: string[]): string => {
  const normalizedNames = possibleNames.map(normalizeColumnName);
  
  for (const key of Object.keys(row)) {
    const normalizedKey = normalizeColumnName(key);
    if (normalizedNames.includes(normalizedKey)) {
      const value = row[key];
      return value !== undefined && value !== null ? value.toString() : '';
    }
  }
  
  return '';
};