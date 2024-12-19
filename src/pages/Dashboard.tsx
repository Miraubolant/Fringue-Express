import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { FeatureGrid } from '../components/dashboard/FeatureGrid';

export const Dashboard: React.FC = () => {
  return (
    <div className="pt-20 space-y-8"> {/* Ajout du padding-top */}
      <DashboardHeader />
      <FeatureGrid />
    </div>
  );
};