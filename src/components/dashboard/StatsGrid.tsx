import React from 'react';
import { StatCard } from './StatCard';
import { dashboardStats } from '../../config/dashboard';
import { useAnalyticsStats } from '../../hooks/useAnalyticsStats';

export const StatsGrid: React.FC = () => {
  const { categoryCount, discountCount, brandCount, loading } = useAnalyticsStats();

  const stats = dashboardStats.map(stat => {
    if (stat.name === 'Articles Vinted / Vestiaire Collectif') {
      return {
        ...stat,
        value: loading ? '...' : categoryCount.toLocaleString('fr-FR')
      };
    }
    if (stat.name === 'Articles Arlettie') {
      return {
        ...stat,
        value: loading ? '...' : discountCount.toLocaleString('fr-FR')
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
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-xl" />
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>
    </div>
  );
};