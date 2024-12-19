import React from 'react';
import { Link } from 'lucide-react';
import { SourceSite } from '../types/source';
import { getSourceStyle, detectSourceSite } from '../utils/sourceStyles';

interface LinkButtonProps {
  url: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ url }) => {
  const source = detectSourceSite(url);
  const styles = getSourceStyle(source);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg
        ${styles.bg} ${styles.hoverBg}
        ${styles.text} ${styles.hoverText}
        border ${styles.border} ${styles.hoverBorder}
        transition-all duration-200
      `}
      title="Voir l'article"
    >
      <Link className="w-4 h-4" />
      <span className="text-sm font-medium">Voir</span>
    </a>
  );
};