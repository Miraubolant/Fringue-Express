import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../ui/ScrollToTop';
import { useSidebarStore } from '../../store/sidebarStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebarStore();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="flex">
        <Sidebar />
        
        <div className={`
          flex-1 min-h-screen
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'ml-20' : 'ml-0 md:ml-64'}
        `}>
          <Header />
          <main className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};