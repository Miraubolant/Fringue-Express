import React from 'react';
import { Database } from 'lucide-react';

export const DataPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center p-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 max-w-lg w-full">
        <div className="w-16 h-16 flex items-center justify-center bg-emerald-500/10 rounded-xl mb-4">
          <Database className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          En cours de développement
        </h2>
        <p className="text-gray-400 text-center">
          Cette fonctionnalité sera bientôt disponible. Elle vous permettra d'accéder à l'ensemble de vos données pour des analyses approfondies.
        </p>
      </div>
    </div>
  );
};