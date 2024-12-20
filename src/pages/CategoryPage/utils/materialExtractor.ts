const VALID_MATERIALS = new Set([
  'Coton',
  'Laine',
  'Cuir',
  'Polyester',
  'Viscose',
  'Alpaga',
  'Mohair',
  'Lin',
  'Soie',
  'Cachemire',
  'Acrylique',
  'Velours',
  'Denim',
  'Mérinos',
  'Daim',
  'Nylon',
  'Élasthanne',
  'Fausse fourrure'
]);

export const extractMaterials = (materialString: string): string[] => {
  // Séparer les matières par la virgule
  const materials = materialString.split(',').map(m => m.trim());
  
  // Vérifier si toutes les matières sont invalides
  const validMaterials = materials.filter(material => VALID_MATERIALS.has(material));
  
  // Si aucune matière valide n'est trouvée, retourner "Autres"
  if (validMaterials.length === 0) {
    return ['Autres'];
  }
  
  return validMaterials;
};

export const isValidMaterial = (material: string): boolean => {
  return VALID_MATERIALS.has(material) || material === 'Autres';
};