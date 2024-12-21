import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DateRange } from '../../pages/CategoryPage/types';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>(value);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && 
          !popupRef.current.contains(event.target as Node) &&
          !triggerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    const newRange = { start: null, end: null };
    setTempRange(newRange);
    onChange(newRange);
    setIsOpen(false);
  };

  // Calculer la position du popup
  const getPopupPosition = () => {
    if (!triggerRef.current) return {};
    
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const idealHeight = 400; // Hauteur idéale du popup
    
    // Si l'espace en dessous est suffisant, placer le popup en dessous
    if (spaceBelow >= idealHeight) {
      return {
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`
      };
    }
    
    // Sinon, placer le popup au-dessus
    return {
      bottom: `${window.innerHeight - rect.top + 8}px`,
      left: `${rect.left}px`
    };
  };

  return (
    <>
      {/* Bouton déclencheur */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 h-10 px-3 rounded-lg
          bg-gray-800/50 border border-gray-700/50
          hover:bg-gray-700/50 hover:border-gray-600/50
          text-gray-300 hover:text-white
          transition-all duration-200
          ${className}
        `}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm">
          {value.start || value.end ? (
            <>
              {formatDate(value.start)} - {formatDate(value.end)}
            </>
          ) : (
            'Sélectionner une période'
          )}
        </span>
      </button>

      {/* Popup du calendrier */}
      {isOpen && createPortal(
        <div
          ref={popupRef}
          className="fixed p-6 rounded-xl bg-gray-800/95 backdrop-blur-sm
                     border border-gray-700/50 shadow-xl z-[99999]
                     min-w-[320px] max-w-[90vw]"
          style={{
            ...getPopupPosition(),
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <div className="space-y-4">
            {/* Titre */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Sélectionner une période
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sélection de la date de début */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Date de début
              </label>
              <input
                type="date"
                value={tempRange.start ? tempRange.start.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  setTempRange(prev => ({ ...prev, start: date }));
                }}
                className="w-full h-10 px-3 rounded-lg
                         bg-gray-700/50 border border-gray-600/50
                         text-gray-200 text-sm
                         focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Sélection de la date de fin */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Date de fin
              </label>
              <input
                type="date"
                value={tempRange.end ? tempRange.end.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  setTempRange(prev => ({ ...prev, end: date }));
                }}
                min={tempRange.start ? tempRange.start.toISOString().split('T')[0] : undefined}
                className="w-full h-10 px-3 rounded-lg
                         bg-gray-700/50 border border-gray-600/50
                         text-gray-200 text-sm
                         focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                         bg-red-500/10 hover:bg-red-500/20
                         text-red-400 hover:text-red-300
                         transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Effacer</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg
                           bg-gray-700/50 hover:bg-gray-700
                           text-gray-300 hover:text-white
                           transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-lg
                           bg-purple-500/10 hover:bg-purple-500/20
                           text-purple-400 hover:text-purple-300
                           transition-colors duration-200"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};