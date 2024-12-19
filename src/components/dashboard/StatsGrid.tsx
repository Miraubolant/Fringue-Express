import React from 'react';
import { StatCard } from './StatCard';
import { dashboardStats } from '../../config/dashboard';
import { useAnalyticsStats } from '../../hooks/useAnalyticsStats';

export const StatsGrid: React.FC = () => {
  const { totalItems, loading } = useAnalyticsStats();

  const stats = dashboardStats.map(stat => {
    if (stat.name === 'Articles analysés') {
      return {
        ...stat,
        value: loading ? '...' : totalItems.toLocaleString('fr-FR')
      };
    }
    return stat;
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.name} {...stat} />
      ))}
    </div>
  );
};