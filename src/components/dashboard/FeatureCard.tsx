import React from 'react';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  status: 'active' | 'coming';
  color: string;
  renderAction: (isActive: boolean) => React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  status,
  color,
  renderAction
}) => {
  const Icon = Icons[icon];
  const isActive = status === 'active';

  return (
    <div className={`
      relative overflow-hidden
      bg-gray-800/50 backdrop-blur-sm rounded-xl
      border border-gray-700/50
      ${isActive ? 'hover:border-' + color + '-500/50' : ''}
      transition-all duration-300
    `}>
      {/* Badge status */}
      <div className="absolute top-4 right-4">
        <span className={`
          px-2.5 py-1 rounded-full text-xs font-medium
          ${isActive 
            ? 'bg-green-500/10 text-green-400' 
            : 'bg-gray-500/10 text-gray-400'}
        `}>
          {isActive ? 'Disponible' : 'Bientôt'}
        </span>
      </div>

      <div className="p-6">
        {/* Icône */}
        <div className={`
          inline-flex items-center justify-center
          w-12 h-12 rounded-lg
          bg-${color}-500/10
          text-${color}-400
        `}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Contenu */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {description}
          </p>
        </div>

        {/* Action */}
        {renderAction(isActive)}
      </div>
    </div>
  );
};