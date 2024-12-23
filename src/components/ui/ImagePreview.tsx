import React, { useEffect, useRef } from 'react';
import { X, ImageOff } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Position the modal relative to current scroll
    if (modalRef.current) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const modalHeight = windowHeight * 0.8; // 80% of viewport height
      const top = scrollY + (windowHeight - modalHeight) / 2;
      modalRef.current.style.top = `${top}px`;
    }

    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 animate-fade-in"
        style={{ maxHeight: '80vh' }}
      >
        <div 
          className="relative bg-gray-900/90 rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-800/90 rounded-full hover:bg-gray-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            style={{ maxHeight: 'calc(80vh - 2rem)' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'flex items-center justify-center p-12 text-gray-500';
              fallback.innerHTML = `
                <div class="flex flex-col items-center gap-4">
                  <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5.12 5.12A3 3 0 0 1 7.17 4h9.66A3 3 0 0 1 20 7.17v9.66a3 3 0 0 1-.88 2.05M5.12 5.12A3 3 0 0 0 4 7.17v9.66a3 3 0 0 0 3.17 3.17h9.66a3 3 0 0 0 2.05-.88M5.12 5.12l13.76 13.76M9 9.5l.5-.5M14.5 5h-.38M18 9.5l-.5-.5M9.5 14l.5.5M5 14.5l.5-.5" />
                  </svg>
                  <p class="text-sm">L'image n'a pas pu être chargée</p>
                </div>
              `;
              target.parentNode?.appendChild(fallback);
            }}
          />
        </div>
      </div>
    </div>
  );
};