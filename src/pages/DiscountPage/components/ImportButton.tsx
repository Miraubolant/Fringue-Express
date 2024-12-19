import React from 'react';
import { Upload } from 'lucide-react';

interface ImportButtonProps {
  onImport: (files: FileList) => void;
  isLoading: boolean;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ onImport, isLoading }) => {
  return (
    <button
      className={`
        relative overflow-hidden
        w-10 h-10 flex items-center justify-center
        rounded-lg transition-all duration-200
        bg-gray-800/50 hover:bg-gray-700/50
        border border-gray-700/50 hover:border-gray-600/50
        text-gray-400 hover:text-gray-300
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:bg-gray-800/50 disabled:hover:border-gray-700/50
        disabled:hover:text-gray-400
      `}
      disabled={isLoading}
      title="Importer un fichier Excel"
    >
      <input
        type="file"
        accept=".xlsx,.xls"
        multiple
        onChange={(e) => {
          if (e.target.files?.length) {
            onImport(e.target.files);
          }
        }}
        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        disabled={isLoading}
      />
      <Upload className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
    </button>
  );
};