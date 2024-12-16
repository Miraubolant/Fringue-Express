import React from 'react';
import { X, FileSpreadsheet } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Aide"
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-2">Comment ça marche ?</h3>
          <p className="text-gray-600">
            1. Importez vos fichiers Excel (analyse_prix.xlsx et liens_shopping.xlsx)<br />
            2. Visualisez l'analyse des prix et des marges<br />
            3. Explorez les détails des produits et leurs revendeurs<br />
            4. Exportez les résultats pour vos rapports
          </p>
        </div>
        <div>
          <h3 className="font-medium text-lg mb-2">Format des fichiers</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">analyse_prix.xlsx</p>
                <p className="text-sm text-gray-600">Contient les références et prix de base</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3">
              <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium">liens_shopping.xlsx</p>
                <p className="text-sm text-gray-600">Contient les prix des revendeurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}