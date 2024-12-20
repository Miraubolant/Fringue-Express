import React from 'react';
import { FeatureCard } from './FeatureCard';
import { dashboardFeatures } from '../../config/dashboard';

export const FeatureGrid: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-xl" />
      <div className="relative grid grid-cols-1 gap-6">
        {dashboardFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};