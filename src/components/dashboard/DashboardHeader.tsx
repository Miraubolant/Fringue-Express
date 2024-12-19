import React from 'react';
import { StatsGrid } from './StatsGrid';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatsGrid />
    </div>
  );
};