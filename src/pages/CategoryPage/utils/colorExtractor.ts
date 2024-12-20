const BASE_COLORS = new Set([
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
  'Moutarde',
  'Fuchsia',
  'Lila',
  'Menthe',
  'Abricot'
]);

export const extractColors = (colorString: string): string[] => {
  // Séparer les couleurs par la virgule
  const colors = colorString.split(',').map(c => c.trim());
  
  // Vérifier si toutes les couleurs sont invalides
  const validColors = colors.filter(color => BASE_COLORS.has(color));
  
  // Si aucune couleur valide n'est trouvée, retourner "Autres"
  if (validColors.length === 0) {
    return ['Autres'];
  }
  
  return validColors;
};

export const isValidColor = (color: string): boolean => {
  return BASE_COLORS.has(color) || color === 'Autres';
};