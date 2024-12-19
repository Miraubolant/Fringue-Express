import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode };
};