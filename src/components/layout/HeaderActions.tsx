import React from 'react';
import { Button } from '../ui/Button';
import { BarChart2, ShoppingBag, Database } from 'lucide-react';

const actions = [
  {
    label: 'Analyse Prix',
    icon: BarChart2,
    onClick: () => console.log('Analyse Prix clicked'),
  },
  {
    label: 'Comparaison',
    icon: ShoppingBag,
    onClick: () => console.log('Comparaison clicked'),
  },
  {
    label: 'Export Data',
    icon: Database,
    onClick: () => console.log('Export Data clicked'),
  },
];

export const HeaderActions: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center">
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            onClick={action.onClick}
            icon={action.icon}
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 px-4"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};