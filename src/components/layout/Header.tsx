import React, { useState, useEffect } from 'react';
import { LogOut, Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSidebarStore } from '../../store/sidebarStore';
import { useLocation } from 'react-router-dom';

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Tableau de bord';
    case '/discount':
      return 'Tri par remise';
    case '/category':
      return 'Tri par catégorie';
    case '/data':
      return 'Données';
    default:
      return '';
  }
};

export const Header: React.FC = () => {
  const { signOut } = useAuthStore();
  const { isCollapsed } = useSidebarStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

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

          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              title="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-gray-700/50 mx-2" />

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