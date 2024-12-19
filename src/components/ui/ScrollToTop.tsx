import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Gérer la visibilité du bouton
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Fonction de scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed right-6 bottom-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-gradient-to-r from-blue-500 to-blue-600
        text-white shadow-lg shadow-blue-500/25
        hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
      `}
      aria-label="Retour en haut"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};