import React, { useState, useRef, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceRangeFilterProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && popupRef.current && containerRef.current) {
      const buttonRect = containerRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Vérifier si le popup dépasse en bas
      if (buttonRect.bottom + popupRect.height > viewportHeight) {
        // Afficher au-dessus du bouton
        popupRef.current.style.bottom = '100%';
        popupRef.current.style.top = 'auto';
        popupRef.current.style.marginBottom = '0.5rem';
      } else {
        // Afficher en dessous du bouton
        popupRef.current.style.top = '100%';
        popupRef.current.style.bottom = 'auto';
        popupRef.current.style.marginTop = '0.5rem';
      }
    }
  }, [isOpen]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = e.target.value ? Number(e.target.value) : null;
    onChange({ ...value, min });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value ? Number(e.target.value) : null;
    onChange({ ...value, max });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 h-10 px-3 rounded-lg
          ${isOpen || value.min !== null || value.max !== null
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
            : 'bg-gray-700/50 text-gray-400 border-gray-600/50'}
          border hover:bg-gray-700/70
          transition-all duration-200
        `}
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm">
          {value.min === null && value.max === null
            ? 'Prix'
            : `${value.min || '0'}€ - ${value.max || '∞'}€`}
        </span>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute left-0 w-64 p-4 rounded-xl
                    bg-gray-800/95 backdrop-blur-sm border border-gray-700/50
                    shadow-xl z-50"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Prix minimum
              </label>
              <input
                type="number"
                min="0"
                value={value.min || ''}
                onChange={handleMinChange}
                className="w-full h-9 px-3 bg-gray-700/50 border border-gray-600/50 rounded-lg
                         text-white text-sm
                         focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="0€"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Prix maximum
              </label>
              <input
                type="number"
                min={value.min || 0}
                value={value.max || ''}
                onChange={handleMaxChange}
                className="w-full h-9 px-3 bg-gray-700/50 border border-gray-600/50 rounded-lg
                         text-white text-sm
                         focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                placeholder="∞"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  onChange({ min: null, max: null });
                  setIsOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg
                         bg-red-500/10 hover:bg-red-500/20
                         text-red-400 hover:text-red-300
                         text-sm transition-colors"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 rounded-lg
                         bg-blue-500/10 hover:bg-blue-500/20
                         text-blue-400 hover:text-blue-300
                         text-sm transition-colors"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};