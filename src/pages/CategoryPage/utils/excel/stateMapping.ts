export const normalizeState = (state: string): string => {
  const normalized = state.toLowerCase().trim();

  const stateMapping: Record<string, string> = {
    // Neuf avec étiquette
    'neuf avec etiquette': 'new_with_tag',
    'jamais porte avec etiquette': 'new_with_tag',
    'neuf avec étiquette': 'new_with_tag',
    'jamais porté avec étiquette': 'new_with_tag',
    
    // Neuf sans étiquette
    'neuf sans etiquette': 'new_without_tag',
    'neuf': 'new_without_tag',
    
    // Jamais porté
    'jamais porte': 'never_worn',
    'jamais porté': 'never_worn',
    
    // Très bon état
    'tres bon etat': 'very_good',
    'très bon état': 'very_good',
    'tres bon état': 'very_good',
    'très bon etat': 'very_good',
    
    // Bon état
    'bon etat': 'good',
    'bon état': 'good',
    
    // Correct/Satisfaisant
    'correct': 'fair',
    'satisfaisant': 'fair'
  };

  return stateMapping[normalized] || normalized;
};

export const getStateLabel = (state: string): string => {
  const stateLabels: Record<string, string> = {
    'new_with_tag': 'Neuf avec étiquette',
    'new_without_tag': 'Neuf sans étiquette',
    'never_worn': 'Jamais porté',
    'very_good': 'Très bon état',
    'good': 'Bon état',
    'fair': 'Correct'
  };

  return stateLabels[state] || state;
};

export const getStateColor = (state: string): string => {
  const stateColors: Record<string, string> = {
    'new_with_tag': 'text-emerald-400',
    'new_without_tag': 'text-green-400',
    'never_worn': 'text-teal-400',
    'very_good': 'text-blue-400',
    'good': 'text-indigo-400',
    'fair': 'text-yellow-400'
  };

  return stateColors[state] || 'text-gray-400';
};

export const isValidState = (state: string): boolean => {
  return ['new_with_tag', 'new_without_tag', 'never_worn', 'very_good', 'good', 'fair'].includes(state);
};