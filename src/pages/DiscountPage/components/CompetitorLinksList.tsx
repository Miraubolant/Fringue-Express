import React from 'react';
import { ExternalLink, Tag, Truck } from 'lucide-react';
import { CompetitorLink } from '../../../types/remise';
import { formatPrice } from '../../../utils/format';
import { getSiteIcon } from '../utils/siteIcons';

interface CompetitorLinksListProps {
  links: CompetitorLink[];
}

export const CompetitorLinksList: React.FC<CompetitorLinksListProps> = ({ links }) => {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {links.map((link, index) => (
        <div 
          key={index}
          className="group relative overflow-hidden bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500/30 transition-all duration-200"
        >
          {/* En-tête avec le site et le logo */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-600/50">
                {getSiteIcon(link.site)}
              </div>
              <span className="font-medium text-gray-200">{link.site}</span>
            </div>
            
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 px-3 py-1.5 rounded-lg
                       bg-gradient-to-r from-blue-500/10 to-blue-600/10
                       hover:from-blue-500/20 hover:to-blue-600/20
                       text-blue-400 hover:text-blue-300
                       border border-blue-500/20 hover:border-blue-500/30
                       shadow-sm hover:shadow-md shadow-blue-500/5
                       transition-all duration-200 transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium">Voir l'article</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Contenu principal */}
          <div className="p-4">
            {/* Titre du produit */}
            <h4 className="text-sm font-medium text-gray-200 mb-3 line-clamp-2">
              {link.title || 'Sans titre'}
            </h4>

            {/* Informations détaillées */}
            <div className="grid grid-cols-2 gap-3">
              {/* Prix */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50">
                <Tag className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">
                  {formatPrice(link.price)}
                </span>
              </div>

              {/* Livraison */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50">
                <Truck className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  Livraison incluse
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};