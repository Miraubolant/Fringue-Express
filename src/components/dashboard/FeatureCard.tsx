import React from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  status: 'active' | 'coming';
  color: string;
  link: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  status,
  color,
  link
}) => {
  const Icon = Icons[icon];
  const isActive = status === 'active';

  return (
    <div className={`
      group relative overflow-hidden
      bg-gray-800/50 backdrop-blur-sm rounded-2xl
      border border-gray-700/50
      ${isActive ? 'hover:border-' + color + '-500/50' : ''}
      transition-all duration-300
      transform hover:scale-[1.02]
    `}>
      <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 opacity-[0.03] pointer-events-none">
        <Icon className="w-full h-full" />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className={`
              flex-shrink-0 w-12 h-12 rounded-xl
              flex items-center justify-center
              bg-${color}-500/10 ring-1 ring-${color}-500/20
              transform group-hover:scale-110 transition-transform duration-300
            `}>
              <Icon className={`w-6 h-6 text-${color}-400`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  {title}
                </h3>
                <span className={`
                  px-2.5 py-1 rounded-full text-xs font-medium
                  ${isActive 
                    ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20' 
                    : 'bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/20'}
                `}>
                  {isActive ? 'Disponible' : 'Bientôt'}
                </span>
              </div>
              
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {isActive && (
            <Link
              to={link}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-${color}-500/10 hover:bg-${color}-500/20
                text-${color}-400 hover:text-${color}-300
                ring-1 ring-${color}-500/20 hover:ring-${color}-500/30
                transform hover:translate-x-1
                transition-all duration-200
              `}
            >
              <span className="text-sm font-medium">Accéder</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};