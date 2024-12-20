import { normalizeString } from '../../../utils/string';

// Liste des matières principales autorisées
const MAIN_MATERIALS = new Set([
  'Coton',
  'Laine',
  'Soie', 
  'Lin',
  'Polyester',
  'Viscose',
  'Nylon',
  'Acrylique',
  'Élasthanne',
  'Cachemire',
  'Mohair',
  'Alpaga',
  'Cuir',
  'Daim',
  'Velours',
  'Denim',
  'Mérinos',
  'Fausse fourrure'
]);

// Mapping des matières alternatives vers les matières principales
const MATERIAL_MAPPING: Record<string, string> = {
  'belgique': 'Autre',
  'italie': 'Autre',
  'soie': 'Soie',
  'cuir': 'Cuir',
  'vert': 'Autre',
  'noir': 'Autre',
  'violet': 'Autre',
  'blanc': 'Autre',
  'kaki': 'Autre',
  'marron': 'Autre'
};

export const normalizeMaterial = (material: string): string => {
  if (!material) return 'Autre';

  // Nettoyer et normaliser la chaîne
  const normalizedInput = normalizeString(material.toLowerCase());
  
  // Vérifier dans le mapping des matières alternatives
  for (const [key, value] of Object.entries(MATERIAL_MAPPING)) {
    if (normalizedInput.includes(normalizeString(key))) {
      return value;
    }
  }

  // Vérifier si c'est une matière principale
  for (const mainMaterial of MAIN_MATERIALS) {
    if (normalizedInput.includes(normalizeString(mainMaterial.toLowerCase()))) {
      return mainMaterial;
    }
  }

  // Si aucune correspondance n'est trouvée, retourner "Autre"
  return 'Autre';
};

export const isValidMaterial = (material: string): boolean => {
  return MAIN_MATERIALS.has(material) || material === 'Autre';
};

export const getAllMaterials = (): string[] => {
  return [...Array.from(MAIN_MATERIALS), 'Autre'].sort();
};