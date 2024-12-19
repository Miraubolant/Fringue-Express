import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 py-2 px-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          Créé par{' '}
          <span className="font-medium text-gray-300">Victor Mirault</span>
        </p>
      </div>
    </footer>
  );
};