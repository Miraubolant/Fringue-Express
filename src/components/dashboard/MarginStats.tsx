import React from 'react';
import { TrendingUp, AlertTriangle, ArrowUpRight, ChevronRight } from 'lucide-react';
import { formatPrice, formatPercentage } from '../../utils/format';
import { useMarginStats } from '../../hooks/useMarginStats';

export const MarginStats: React.FC = () => {
  const { globalMargin, topItems, negativeItems, loading } = useMarginStats();

  if (loading) return null;

  return (
    <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
      {/* Header avec la marge globale */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Analyse des marges
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Vue d'ensemble de la rentabilité
            </p>
          </div>
          <div className={`
            flex items-center gap-3 px-4 py-2 rounded-xl
            ${globalMargin >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}
            border ${globalMargin >= 0 ? 'border-green-500/20' : 'border-red-500/20'}
          `}>
            <TrendingUp className={`w-5 h-5 ${globalMargin >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-lg font-bold ${globalMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(globalMargin)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-700/50">
        {/* Top 5 des articles rentables */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-300">
              Articles les plus rentables
            </h4>
            <span className="text-xs text-gray-400">Top 5</span>
          </div>
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div 
                key={item.reference}
                className="group flex items-center gap-4 p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-medium text-sm">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors" title={item.title}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{item.brand}</span>
                    <span className="text-xs font-medium text-white">
                      {formatPrice(item.priceBrand)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm font-medium text-green-400">
                    {formatPercentage(item.margin)}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Articles à marge négative */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-medium text-red-400">
                Attention requise
              </h4>
            </div>
            <span className="text-xs text-gray-400">
              {negativeItems.length} article{negativeItems.length > 1 ? 's' : ''}
            </span>
          </div>
          
          {negativeItems.length > 0 ? (
            <div className="space-y-3">
              {negativeItems.map((item) => (
                <div 
                  key={item.reference}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-red-400 transition-colors" title={item.title}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{item.brand}</span>
                      <span className="text-xs font-medium text-white">
                        {formatPrice(item.priceBrand)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium text-red-400 bg-red-500/20 rounded-lg">
                      {formatPercentage(item.margin)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-red-400/50 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-sm text-gray-400">
                Aucun article à marge négative
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};