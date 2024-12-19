import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FilterTooltip: React.FC = () => {
  return (
    <div className="relative group">
      <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
        <HelpCircle className="w-5 h-5" />
      </button>
      
      <div className="fixed right-4 top-auto mt-2 w-80 p-4 rounded-xl 
                    bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 
                    shadow-xl z-[9999] invisible group-hover:visible 
                    opacity-0 group-hover:opacity-100 transition-all duration-200">
        <h3 className="text-sm font-semibold text-white mb-2">Colonnes Excel requises :</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><span className="text-purple-400">Titre/Title</span> - Nom de l'article</li>
          <li><span className="text-purple-400">Marque/Brand</span> - Marque de l'article</li>
          <li><span className="text-purple-400">État/State</span> - État de l'article</li>
          <li><span className="text-purple-400">Matière/Material</span> - Matière principale</li>
          <li><span className="text-purple-400">Couleur/Color</span> - Couleur dominante</li>
          <li><span className="text-purple-400">Prix/Price</span> - Prix de vente</li>
          <li><span className="text-purple-400">Lien/Link/URL</span> - Lien vers l'article</li>
        </ul>
      </div>
    </div>
  );
};