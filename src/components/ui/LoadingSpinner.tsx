import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center py-4">
      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
    </div>
  );
};