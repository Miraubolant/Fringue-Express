import React from 'react';
import { StatCard } from './StatCard';
import { dashboardStats } from '../../config/dashboard';
import { useAnalyticsStats } from '../../hooks/useAnalyticsStats';

export const StatsGrid: React.FC = () => {
  const { totalItems, categoryItems, brandCount, loading } = useAnalyticsStats();

  const stats = dashboardStats.map(stat => {
    if (stat.name === 'Articles analysés Arlettie') {
      return {
        ...stat,
        value: loading ? '...' : totalItems.toLocaleString('fr-FR')
      };
    }
    if (stat.name === 'Articles catégorisés') {
      return {
        ...stat,
        value: loading ? '...' : categoryItems.toLocaleString('fr-FR')
      };
    }
    if (stat.name === 'Marques') {
      return {
        ...stat,
        value: loading ? '...' : brandCount.toLocaleString('fr-FR')
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