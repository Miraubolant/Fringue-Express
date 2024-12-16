import React from 'react';
import { Shirt, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-navy-800 to-navy-900 dark:from-navy-900 dark:to-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
              <Shirt className="w-6 h-6 text-navy-100" />
              <h1 className="text-xl font-bold text-white">Fringue Express</h1>
            </div>
            <span className="text-sm text-navy-200 hidden sm:block">
              Analyseur de prix intelligent
            </span>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-navy-100" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}