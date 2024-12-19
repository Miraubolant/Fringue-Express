export const normalizeString = (str: string): string => {
  return str.toString().toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, "") // Remove special characters
    .trim();
};