import { normalizeString } from '../../../utils/string';

// Liste des couleurs principales autorisées
const MAIN_COLORS = new Set([
  'Blanc',
  'Noir',
  'Gris',
  'Bleu',
  'Rouge',
  'Vert',
  'Jaune',
  'Orange',
  'Rose',
  'Violet',
  'Marron',
  'Beige',
  'Bordeaux',
  'Marine',
  'Turquoise',
  'Corail',
  'Doré',
  'Argenté',
  'Crème',
  'Kaki',
  'Multicolore'
]);

// Mapping des couleurs alternatives vers les couleurs principales
const COLOR_MAPPING: Record<string, string> = {
  // Bleu
  'marine': 'Marine',
  'bleu clair': 'Bleu',
  // Rouge
  'bordeaux': 'Bordeaux',
  'fuchsia': 'Rose',
  // Beige/Marron
  'moutarde': 'Marron',
  'camel': 'Marron',
  'taupe': 'Marron',
  'crème': 'Crème',
  // Métalliques
  'or': 'Doré',
  'argent': 'Argenté',
  // Autres
  'lila': 'Violet'
};

export const normalizeColor = (color: string): string => {
  if (!color) return 'Autre';

  // Si c'est un nombre, retourner "Autre"
  if (!isNaN(Number(color))) return 'Autre';

  // Nettoyer et normaliser la chaîne
  const normalizedInput = normalizeString(color.toLowerCase());
  
  // Vérifier si c'est multicolore
  if (normalizedInput.includes('multi')) return 'Multicolore';

  // Vérifier dans le mapping des couleurs alternatives
  for (const [key, value] of Object.entries(COLOR_MAPPING)) {
    if (normalizedInput.includes(normalizeString(key))) {
      return value;
    }
  }

  // Vérifier si c'est une couleur principale
  for (const mainColor of MAIN_COLORS) {
    if (normalizedInput.includes(normalizeString(mainColor.toLowerCase()))) {
      return mainColor;
    }
  }

  // Si aucune correspondance n'est trouvée, retourner "Autre"
  return 'Autre';
};

export const isValidColor = (color: string): boolean => {
  return MAIN_COLORS.has(color) || color === 'Autre';
};

export const getAllColors = (): string[] => {
  return [...Array.from(MAIN_COLORS), 'Autre'].sort();
};