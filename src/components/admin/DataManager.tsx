import React, { useState, useRef, useEffect } from 'react';
import { Trash2, AlertTriangle, Loader2, Database } from 'lucide-react';
import { deleteCollection } from '../../services/firebase/admin';
import { ScrollArea } from '../ui/ScrollArea';
import { useUserRole } from '../../hooks/useUserRole';
import { useAuthStore } from '../../store/authStore';

const COLLECTIONS = [
  { id: 'category_items', name: 'Articles Seconde Main', icon: Database },
  { id: 'remise_items', name: 'Articles Arlettie', icon: Database },
  { id: 'saved_carts', name: 'Paniers sauvegardés', icon: Database },
  { id: 'favorites', name: 'Favoris', icon: Database }
];

interface DataManagerProps {
  onClose: () => void;
}

export const DataManager: React.FC<DataManagerProps> = ({ onClose }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { isAdmin } = useUserRole(user?.uid);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleDelete = async () => {
    if (!selectedCollection || !showConfirm) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await deleteCollection(selectedCollection);
      setShowConfirm(false);
      setSelectedCollection('');
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 p-4 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50"
    >
      <div className="w-80">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <select
              value={selectedCollection}
              onChange={(e) => {
                setSelectedCollection(e.target.value);
                setShowConfirm(false);
              }}
              className="w-full h-10 appearance-none
                       bg-gray-700/50 border border-gray-600/50 
                       rounded-lg px-3 pr-8
                       text-sm text-gray-200 
                       focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20
                       hover:bg-gray-600/50 hover:border-gray-500/50
                       transition-all duration-200
                       cursor-pointer"
            >
              <option value="" className="bg-gray-800 text-gray-300 py-2">
                Sélectionner une table
              </option>
              {COLLECTIONS.map((collection) => (
                <option 
                  key={collection.id} 
                  value={collection.id}
                  className="bg-gray-800 text-gray-200 py-2"
                >
                  {collection.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400 group-hover:text-gray-300">
              <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {selectedCollection && !showConfirm && (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
                       text-red-400 hover:text-red-300 text-sm font-medium
                       border border-red-500/20 hover:border-red-500/30
                       transition-all duration-200"
            >
              Supprimer la table
            </button>
          )}

          {showConfirm && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Attention</span>
                </div>
                <p className="text-sm text-red-300">
                  Cette action est irréversible. Toutes les données de la table seront définitivement supprimées.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                           text-white text-sm font-medium
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Suppression...
                    </span>
                  ) : (
                    'Confirmer la suppression'
                  )}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700
                           text-gray-300 hover:text-white text-sm font-medium
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};