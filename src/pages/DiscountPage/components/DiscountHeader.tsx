import React from 'react';
import { Upload, FileUp } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface DiscountHeaderProps {
  onFileImport: (file: File) => void;
  isLoading: boolean;
}

export const DiscountHeader: React.FC<DiscountHeaderProps> = ({
  onFileImport,
  isLoading
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileImport(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Tri par remise
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Analysez et triez vos produits par pourcentage de remise
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          icon={Upload}
          className="relative overflow-hidden"
          disabled={isLoading}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          {isLoading ? 'Importation...' : 'Importer Excel'}
        </Button>
      </div>
    </div>
  );
};