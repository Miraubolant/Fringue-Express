import React from 'react';
import { ShoppingBag, TrendingUp, Percent } from 'lucide-react';
import { Card } from '../ui/Card';
import { AnalysisResult } from '../../types';
import { cn } from '../../utils/styles';

interface StatsOverviewProps {
  results: AnalysisResult[];
}

export function StatsOverview({ results }: StatsOverviewProps) {
  const totalItems = results.length;
  const profitableItems = results.filter(r => r.profitMargin > 0).length;
  const averageMargin = results.reduce((acc, r) => acc + r.profitMargin, 0) / totalItems;

  const stats = [
    {
      name: 'Articles analysés',
      value: totalItems,
      icon: ShoppingBag,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
    },
    {
      name: 'Articles rentables',
      value: profitableItems,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      name: 'Marge moyenne',
      value: `${averageMargin.toFixed(1)}%`,
      icon: Percent,
      color: averageMargin > 0 ? 'text-emerald-600' : 'text-rose-600',
      bgColor: averageMargin > 0 ? 'bg-emerald-50' : 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name} className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-50/50" />
          <div className="px-6 py-5 relative">
            <div className="flex items-center">
              <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}