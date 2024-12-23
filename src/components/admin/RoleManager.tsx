import React, { useState, useRef, useEffect } from 'react';
import { Users, X, Shield, Trash2, Search, Loader2 } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import { deleteUser, updateUserRole } from '../../services/firebase/users';
import { useUserRole } from '../../hooks/useUserRole';
import { useAuthStore } from '../../store/authStore';

interface RoleManagerProps {
  onClose: () => void;
}

export const RoleManager: React.FC<RoleManagerProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading, error } = useUsers();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { user } = useAuthStore();
  const { isAdmin } = useUserRole(user?.uid);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isAdmin) return null;

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setIsUpdating(userId);
      await updateUserRole(userId, newRole);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du rôle:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      setIsDeleting(userId);
      await deleteUser(userId);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 rounded-xl bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Gestion des rôles
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-gray-700/50 border border-gray-600/50 rounded-lg
                     text-sm text-white placeholder-gray-400
                     focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Error message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg
                         bg-gray-700/30 hover:bg-gray-700/50
                         border border-gray-600/30
                         transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-600/50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id!, e.target.value)}
                    disabled={isUpdating === user.id}
                    className="h-8 px-2 bg-gray-600/50 border border-gray-500/50 rounded-lg
                             text-sm text-gray-300
                             focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>

                  <button
                    onClick={() => handleDeleteUser(user.id!)}
                    disabled={isDeleting === user.id || user.email === user?.email}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors"
                    title={user.email === user?.email ? 'Impossible de supprimer votre propre compte' : 'Supprimer'}
                  >
                    {isDeleting === user.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-4">
                Aucun utilisateur trouvé
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};