import React, { useState, useRef, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useComparisonStore } from '../../store/comparisonStore';

export const SaveComparisonButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const { items, saveComparison, isLoading } = useComparisonStore();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (!name.trim() || isLoading) return;
    await saveComparison(name);
    setName('');
    setIsOpen(false);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                 bg-blue-500/10 hover:bg-blue-500/20 
                 text-blue-400 hover:text-blue-300
                 border border-blue-500/20 hover:border-blue-500/30
                 transition-all duration-200"
      >
        <Save className="w-4 h-4" />
        <span className="text-sm">Sauvegarder</span>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-72 p-4 rounded-xl
                    bg-gray-800/95 backdrop-blur-sm border border-gray-700/50
                    shadow-xl z-50"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Nom de la comparaison
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ma comparaison..."
                className="w-full h-9 px-3 bg-gray-700/50 border border-gray-600/50 rounded-lg
                         text-white text-sm
                         focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!name.trim() || isLoading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                       bg-blue-500 hover:bg-blue-600
                       text-white text-sm font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};