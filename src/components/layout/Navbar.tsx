import React, { useState } from 'react';
import { Download, Upload, Settings, HelpCircle, History } from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { HelpModal } from '../modals/HelpModal';
import { SettingsModal } from '../modals/SettingsModal';
import { AnalysisResult, PriceSettings } from '../../types';

interface NavbarProps {
  onImport: () => void;
  results: AnalysisResult[];
  settings: PriceSettings;
  onSettingsChange: (settings: PriceSettings) => void;
}

export function Navbar({ onImport, results, settings, onSettingsChange }: NavbarProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleExport = () => {
    if (results.length === 0) return;
    exportToExcel(results);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2">
              <button
                onClick={onImport}
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors"
              >
                <Upload className="h-4 w-4 mr-1.5" />
                Importer
              </button>
              <button
                onClick={handleExport}
                disabled={results.length === 0}
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Exporter
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <History className="h-4 w-4 mr-1.5" />
                Historique
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHelp(true)}
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="h-4 w-4 mr-1.5" />
                Aide
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-4 w-4 mr-1.5" />
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </nav>

      <HelpModal 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
    </>
  );
}