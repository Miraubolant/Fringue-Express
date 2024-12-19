import React from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FeatureGrid } from '../../components/dashboard/FeatureGrid';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <FeatureGrid />
    </div>
  );
};