import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { dashboardFeatures } from '../../config/dashboard';

export const FeatureGrid: React.FC = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"> {/* Ajout de margin-top */}
      {dashboardFeatures.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          renderAction={(isActive) => 
            isActive ? (
              <Link
                to={feature.link}
                className={`
                  mt-4 inline-flex items-center gap-2
                  text-${feature.color}-400 hover:text-${feature.color}-300
                  transition-colors duration-200
                `}
              >
                <span className="text-sm font-medium">Accéder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="mt-4 inline-flex items-center gap-2 text-gray-500 cursor-not-allowed">
                <span className="text-sm font-medium">Bientôt disponible</span>
              </span>
            )
          }
        />
      ))}
    </div>
  );
};