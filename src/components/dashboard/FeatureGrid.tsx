import React from 'react';
import { FeatureCard } from './FeatureCard';
import { dashboardFeatures } from '../../config/dashboard';
import { ResponsiveGrid } from '../ui/ResponsiveGrid';

export const FeatureGrid: React.FC = () => {
  return (
    <div className="relative mt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-xl" />
      <ResponsiveGrid 
        cols={{ default: 1, lg: 2 }} 
        gap="6"
        className="relative"
      >
        {dashboardFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </ResponsiveGrid>
    </div>
  );
};