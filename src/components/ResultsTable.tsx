import React from 'react';
import { ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { AnalysisResult } from '../types';
import { formatPrice, formatPercentage } from '../utils/formatters';

interface ResultsTableProps {
  results: AnalysisResult[];
}

const TableHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix d'achat</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix de revente</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marge</th>
    </tr>
  </thead>
);

const TableRow = ({ result, index }: { result: AnalysisResult; index: number }) => (
  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {result.item.reference}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {result.item.type}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {formatPrice(result.item.purchasePrice)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {formatPrice(result.resalePrice)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <a 
        href={result.source}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        {new URL(result.source).hostname}
        <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </td>
    <td className={clsx(
      "px-6 py-4 whitespace-nowrap text-sm font-medium",
      result.profitMargin > 0 ? "text-green-600" : "text-red-600"
    )}>
      {formatPercentage(result.profitMargin)}
    </td>
  </tr>
);

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <TableRow key={index} result={result} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}