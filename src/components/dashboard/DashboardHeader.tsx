import React from 'react';
import { StatsGrid } from './StatsGrid';
import { PlatformPrices } from './PlatformPrices';
import { MarginStats } from './MarginStats';
import { usePlatformStats } from '../../hooks/usePlatformStats';

export const DashboardHeader: React.FC = () => {
  const { stats, loading } = usePlatformStats();

  return (
    <div className="space-y-6">
      <StatsGrid />
      {!loading && <PlatformPrices data={stats} />}
      <MarginStats />
    </div>
  );
};