import React from 'react';
import { Filter } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center p-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 max-w-lg w-full">
        <div className="w-16 h-16 flex items-center justify-center bg-purple-500/10 rounded-xl mb-4">
          <Filter className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          En cours de développement
        </h2>
        <p className="text-gray-400 text-center">
          Cette fonctionnalité sera bientôt disponible. Elle vous permettra d'analyser vos produits par catégorie pour une meilleure gestion de votre catalogue.
        </p>
      </div>
    </div>
  );
};