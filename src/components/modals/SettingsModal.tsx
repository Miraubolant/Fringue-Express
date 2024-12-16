import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { PriceSettings } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PriceSettings;
  onSettingsChange: (settings: PriceSettings) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Paramètres d'analyse"
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Réduction Arlettie (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={localSettings.arlettieDiscount}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              arlettieDiscount: Number(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
          <p className="mt-1 text-sm text-gray-500">Réduction appliquée sur le prix Arlettie</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Marge minimum souhaitée (%)</label>
          <input
            type="number"
            min="0"
            value={localSettings.minProfitMargin}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              minProfitMargin: Number(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
          <p className="mt-1 text-sm text-gray-500">Marge minimum pour considérer un article rentable</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Frais de port maximum (€)</label>
          <input
            type="number"
            min="0"
            value={localSettings.maxShippingCost}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              maxShippingCost: Number(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
}