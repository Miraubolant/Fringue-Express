import { SourceSite, SourceStyle } from '../types/source';

export const getSourceStyle = (source: SourceSite): SourceStyle => {
  const styles: Record<SourceSite, SourceStyle> = {
    vinted: {
      bg: 'bg-blue-500/10',
      hoverBg: 'hover:bg-blue-500/20',
      text: 'text-blue-400',
      hoverText: 'hover:text-blue-300',
      border: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/30'
    },
    vestiaire_collective: {
      bg: 'bg-orange-500/10',
      hoverBg: 'hover:bg-orange-500/20',
      text: 'text-orange-400',
      hoverText: 'hover:text-orange-300',
      border: 'border-orange-500/20',
      hoverBorder: 'hover:border-orange-500/30'
    },
    other: {
      bg: 'bg-purple-500/10',
      hoverBg: 'hover:bg-purple-500/20',
      text: 'text-purple-400',
      hoverText: 'hover:text-purple-300',
      border: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/30'
    }
  };

  return styles[source];
};

export const detectSourceSite = (url: string): SourceSite => {
  const normalizedUrl = url.toLowerCase();
  if (normalizedUrl.includes('vinted')) return 'vinted';
  if (normalizedUrl.includes('vestiairecollective')) return 'vestiaire_collective';
  return 'other';
};