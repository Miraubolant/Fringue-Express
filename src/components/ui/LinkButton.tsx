import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkButtonProps {
  url: string;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ url = '', className = '' }) => {
  const getSourceStyle = () => {
    if (!url) {
      return {
        bg: 'bg-gray-500/10',
        hoverBg: 'hover:bg-gray-500/20',
        text: 'text-gray-400',
        hoverText: 'hover:text-gray-300',
        border: 'border-gray-500/20',
        hoverBorder: 'hover:border-gray-500/30'
      };
    }

    const normalizedUrl = url.toLowerCase();
    if (normalizedUrl.includes('vinted')) {
      return {
        bg: 'bg-blue-500/10',
        hoverBg: 'hover:bg-blue-500/20',
        text: 'text-blue-400',
        hoverText: 'hover:text-blue-300',
        border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/30'
      };
    }
    if (normalizedUrl.includes('vestiairecollective')) {
      return {
        bg: 'bg-orange-500/10',
        hoverBg: 'hover:bg-orange-500/20',
        text: 'text-orange-400',
        hoverText: 'hover:text-orange-300',
        border: 'border-orange-500/20',
        hoverBorder: 'hover:border-orange-500/30'
      };
    }
    return {
      bg: 'bg-purple-500/10',
      hoverBg: 'hover:bg-purple-500/20',
      text: 'text-purple-400',
      hoverText: 'hover:text-purple-300',
      border: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/30'
    };
  };

  const styles = getSourceStyle();

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group flex items-center gap-2 px-3 py-1.5
        ${styles.bg} ${styles.hoverBg}
        ${styles.text} ${styles.hoverText}
        rounded-lg border ${styles.border} ${styles.hoverBorder}
        transition-all duration-200
        ${className}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium">Voir</span>
      <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </a>
  );
};