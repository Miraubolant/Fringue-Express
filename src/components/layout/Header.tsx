import React, { useState, useEffect } from 'react';
import { LogOut, User, Star, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSidebarStore } from '../../store/sidebarStore';
import { useLocation } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Tableau de bord';
    case '/discount':
      return 'Remise Arlettie';
    case '/category':
      return 'Articles Seconde Main';
    case '/data':
      return 'Données';
    default:
      return '';
  }
};

export const Header: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { isCollapsed } = useSidebarStore();
  const { getFavoritesCount, clearFavorites } = useFavoritesStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
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
        fixed top-0 left-0 right-0 z-50 h-16
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
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
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