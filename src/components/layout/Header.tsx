import React, { useState, useEffect } from 'react';
import { LogOut, User, Star, Trash2, Database } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSidebarStore } from '../../store/sidebarStore';
import { useLocation } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';
import { DataManager } from '../admin/DataManager';

const getPageTitle = (pathname: string): { title: string; subtitle: string } => {
  switch (pathname) {
    case '/dashboard':
      return {
        title: 'Tableau de bord',
        subtitle: 'Vue d\'ensemble de vos données'
      };
    case '/discount':
      return {
        title: 'Remise Arlettie',
        subtitle: 'Analysez et optimisez vos marges'
      };
    case '/category':
      return {
        title: 'Articles Seconde Main',
        subtitle: 'Gérez vos articles Vinted et Vestiaire Collectif'
      };
    case '/data':
      return {
        title: 'Données',
        subtitle: 'Accédez à vos données brutes'
      };
    default:
      return {
        title: '',
        subtitle: ''
      };
  }
};

export const Header: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { isCollapsed } = useSidebarStore();
  const { getFavoritesCount, clearFavorites } = useFavoritesStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);
  const location = useLocation();
  const { title, subtitle } = getPageTitle(location.pathname);
  const favoritesCount = getFavoritesCount();
  const isAdmin = user?.email === 'victor@mirault.com';

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
        fixed top-0 left-0 right-0 z-50 h-20
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-black/10' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="h-full flex items-center">
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`} />

        <div className="flex-1 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Favoris */}
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

            {/* Gestionnaire de données (admin) */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowDataManager(!showDataManager)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                >
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-medium">Base de données</span>
                </button>

                {showDataManager && (
                  <DataManager 
                    userEmail={user.email || ''} 
                    onClose={() => setShowDataManager(false)}
                  />
                )}
              </div>
            )}

            {/* Email de l'utilisateur */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">
                {user?.email}
              </span>
            </div>

            {/* Déconnexion */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};