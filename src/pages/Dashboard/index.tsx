import React from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FeatureGrid } from '../../components/dashboard/FeatureGrid';
import { ExcelHelpCard } from '../../components/dashboard/ExcelHelpCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="pt-24 pb-12 space-y-8">
      <DashboardHeader />
      <FeatureGrid />
      <ExcelHelpCard />
    </div>
  );
};