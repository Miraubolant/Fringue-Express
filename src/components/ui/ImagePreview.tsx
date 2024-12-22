import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the modal relative to current scroll position
    if (modalRef.current) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const modalHeight = Math.min(windowHeight * 0.8, 800); // Max 80% of viewport or 800px
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
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute -top-10 right-4 p-2 text-red-400 hover:text-red-300 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg"
            style={{ maxHeight: 'calc(80vh - 2rem)' }}
          />
        </div>
      </div>
    </div>
  );
};