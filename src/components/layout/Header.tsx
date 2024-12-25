import React from 'react';
import { Database, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUserRole } from '../../hooks/useUserRole';
import { DataManager } from '../admin/DataManager';
import { RoleManager } from '../admin/RoleManager';
import { UserMenu } from './UserMenu';

export const Header: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { isAdmin } = useUserRole(user?.uid);
  const [showDataManager, setShowDataManager] = React.useState(false);
  const [showRoleManager, setShowRoleManager] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50">
      <div className="h-full max-w-screen-2xl mx-auto px-4 md:px-6 flex items-center justify-end">
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Admin Actions */}
          {isAdmin && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setShowDataManager(!showDataManager)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
              >
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">Base de données</span>
              </button>

              <button
                onClick={() => setShowRoleManager(!showRoleManager)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Rôles</span>
              </button>
            </div>
          )}

          {/* Menu utilisateur */}
          <UserMenu />

          {/* Déconnexion */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Managers */}
      {showDataManager && (
        <DataManager onClose={() => setShowDataManager(false)} />
      )}
      {showRoleManager && (
        <RoleManager onClose={() => setShowRoleManager(false)} />
      )}
    </header>
  );
};