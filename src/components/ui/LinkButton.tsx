import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ 
  href, 
  label = 'Voir', 
  className = '' 
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group flex items-center gap-2 px-3 py-1.5
        bg-blue-500/10 hover:bg-blue-500/20
        text-blue-400 hover:text-blue-300
        rounded-lg border border-blue-500/20 hover:border-blue-500/30
        transition-all duration-200
        ${className}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium">{label}</span>
      <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </a>
  );
};