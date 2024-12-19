import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ 
  onRefresh, 
  isRefreshing 
}) => {
  return (
    <div className="w-[140px]"> {/* Conteneur fixe */}
      <Button
        variant="ghost"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="w-full h-10"
      >
        <div className="flex items-center justify-center gap-2">
          <RefreshCw 
            className={`w-4 h-4 flex-shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
          <span className="truncate">
            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </span>
        </div>
      </Button>
    </div>
  );
};