import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="w-10 h-10 p-0"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
      )}
    </Button>
  );
};