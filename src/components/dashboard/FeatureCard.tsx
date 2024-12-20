import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ColumnInfo {
  name: string;
  required: boolean;
}

interface HelpSection {
  title: string;
  columns: ColumnInfo[];
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  status: 'active' | 'coming';
  color: string;
  link: string;
  helpTitle?: string;
  helpSections?: HelpSection[];
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  status,
  color,
  link,
  helpTitle,
  helpSections
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = Icons[icon];
  const isActive = status === 'active';

  return (
    <div className={`
      group relative overflow-hidden
      bg-gray-800/50 backdrop-blur-sm rounded-xl
      border border-gray-700/50
      ${isActive ? 'hover:border-' + color + '-500/50' : ''}
      transition-all duration-300
    `}>
      <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 opacity-[0.03] pointer-events-none">
        <Icon className="w-full h-full" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className={`
              flex-shrink-0 w-12 h-12 rounded-xl
              flex items-center justify-center
              bg-${color}-500/10
            `}>
              <Icon className={`w-6 h-6 text-${color}-400`} />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  {title}
                </h3>
                <span className={`
                  px-2.5 py-1 rounded-full text-xs font-medium
                  ${isActive 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-gray-500/10 text-gray-400'}
                `}>
                  {isActive ? 'Disponible' : 'Bientôt'}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                {description}
              </p>
              {isActive && (
                <Link
                  to={link}
                  className={`
                    mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                    bg-${color}-500/10 hover:bg-${color}-500/20
                    text-${color}-400 hover:text-${color}-300
                    transition-all duration-200
                  `}
                >
                  <span className="text-sm font-medium">Accéder</span>
                  <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {helpSections && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                flex items-center gap-2 px-3 py-2
                text-sm font-medium rounded-lg
                bg-gray-700/30 hover:bg-gray-700/50
                text-gray-300 hover:text-white
                transition-all duration-200
              `}
            >
              Format Excel
              <ChevronDown className={`
                w-4 h-4 transition-transform duration-200
                ${isExpanded ? 'rotate-180' : ''}
              `} />
            </button>
          )}
        </div>

        {helpSections && (
          <div className={`
            mt-6 pt-6 border-t border-gray-700/50
            grid transition-all duration-200
            ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
          `}>
            <div className="overflow-hidden">
              <div className="space-y-4">
                {helpSections.map((section, index) => (
                  <div 
                    key={index}
                    className={`
                      bg-gray-700/20 rounded-xl p-4
                      border border-gray-600/20
                    `}
                  >
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      {section.title}
                    </h4>
                    <div className="grid gap-2">
                      {section.columns.map((column, columnIndex) => (
                        <div 
                          key={columnIndex}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-700/30"
                        >
                          <span className="text-sm text-gray-300">{column.name}</span>
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
                            ${column.required
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-gray-500/10 text-gray-400'
                            }
                          `}>
                            {column.required ? 'Requis' : 'Optionnel'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};