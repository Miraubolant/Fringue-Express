import { truncate } from './text';

export const normalizeString = (str: string): string => {
  return str.toString().toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, "") // Remove special characters
    .trim();
};

export const truncateTitle = (title: string, length: number = 25): string => {
  if (title.length <= length) return title;
  return `${title.substring(0, length)}...`;
};