import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Filter, 
  Percent, 
  Database,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';
import { Logo } from './Logo';

const navigation = [
  {
    category: 'Principal',
    items: [
      { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    category: 'Analyse',
    items: [
      { name: 'Articles Seconde Main', href: '/category', icon: Filter },
      { name: 'Remise Arlettie', href: '/discount', icon: Percent },
      { name: 'Comparaison Articles', href: '/data', icon: Database }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <aside 
      className={`
        fixed top-0 bottom-0 left-0 z-50
        bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Logo variant="sidebar" />

        {/* Navigation */}
        <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          {navigation.map((section, index) => (
            <div key={section.category} className={`px-4 ${index > 0 ? 'mt-6' : ''}`}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
              )}

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl
                        transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-white'
                          : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                        }
                      `}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Icon
                        className={`
                          flex-shrink-0 h-5 w-5 transition-colors duration-200
                          ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}
                        `}
                      />
                      
                      {!isCollapsed && (
                        <span className="ml-3">{item.name}</span>
                      )}

                      {isActive && (
                        <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-full transform -translate-x-2" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={toggle}
            className="flex items-center justify-center px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/30 transition-all duration-200 w-full"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <div className="flex items-center">
                <PanelLeftClose className="h-5 w-5" />
                <span className="ml-3">Réduire</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};