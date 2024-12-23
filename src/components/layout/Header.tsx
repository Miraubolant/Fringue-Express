import React, { useState, useEffect } from 'react';
import { Menu, LogOut, User, Star, Trash2, Database, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSidebarStore } from '../../store/sidebarStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useUserRole } from '../../hooks/useUserRole';
import { DataManager } from '../admin/DataManager';
import { RoleManager } from '../admin/RoleManager';
import { getPageTitle } from '../../utils/navigation';

export const Header: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { isCollapsed } = useSidebarStore();
  const { getFavoritesCount, clearFavorites } = useFavoritesStore();
  const { isAdmin } = useUserRole(user?.uid);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);
  const [showRoleManager, setShowRoleManager] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { title, subtitle } = getPageTitle(location.pathname);
  const favoritesCount = getFavoritesCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 h-16 md:h-20
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-black/10' : 'bg-transparent'}
      `}
    >
      <div className="h-full flex items-center">
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-0 md:w-64'}`} />

        <div className="flex-1 flex items-center justify-between px-4 md:px-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs md:text-sm text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Favorites */}
              {favoritesCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-medium text-yellow-400">
                      {favoritesCount} favori{favoritesCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    onClick={clearFavorites}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Réinitialiser les favoris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Admin Actions */}
              {isAdmin && (
                <>
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
                </>
              )}

              {/* User Info */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  {user?.email}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gray-800 p-4">
            <div className="space-y-4">
              {favoritesCount > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm text-yellow-400">
                      {favoritesCount} favori{favoritesCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    onClick={clearFavorites}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {isAdmin && (
                <>
                  <button
                    onClick={() => {
                      setShowDataManager(!showDataManager);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/50"
                  >
                    <Database className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Base de données</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowRoleManager(!showRoleManager);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/50"
                  >
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Rôles</span>
                  </button>
                </>
              )}

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/50">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{user?.email}</span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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