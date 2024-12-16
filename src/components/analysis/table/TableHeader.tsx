import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Tag, Euro, Percent } from 'lucide-react';
import { cn } from '../../../utils/styles';

interface TableHeaderProps {
  arlettieDiscount: number;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export function TableHeader({ arlettieDiscount, sortField, sortDirection, onSort }: TableHeaderProps) {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-navy-400/50" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-navy-500" />
      : <ArrowDown className="h-4 w-4 text-navy-500" />;
  };

  const HeaderCell = ({ 
    field, 
    label, 
    align = 'left',
    icon: Icon 
  }: { 
    field: string; 
    label: string; 
    align?: 'left' | 'right';
    icon?: React.ElementType;
  }) => (
    <th 
      onClick={() => onSort(field)}
      className={cn(
        "px-6 py-4 text-xs font-medium tracking-wider cursor-pointer",
        "text-navy-500 dark:text-navy-300",
        "bg-navy-50/80 dark:bg-navy-800/80 hover:bg-navy-100/80 dark:hover:bg-navy-700/80",
        "transition-colors duration-150 border-b-2 border-navy-100 dark:border-navy-700",
        align === 'right' ? "text-right" : "text-left"
      )}
    >
      <div className={cn(
        "flex items-center gap-2",
        align === 'right' ? "justify-end" : "justify-start"
      )}>
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <thead className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm sticky top-0 z-10">
      <tr>
        <th className="w-8 px-4 py-4 bg-navy-50/80 dark:bg-navy-800/80 border-b-2 border-navy-100 dark:border-navy-700" />
        <HeaderCell field="title" label="ARTICLE" icon={Tag} />
        <HeaderCell 
          field="arlettiePrice" 
          label={`PRIX ARLETTIE${arlettieDiscount ? ` (-${arlettieDiscount}%)` : ''}`}
          align="right"
          icon={Euro}
        />
        <HeaderCell field="brandPrice" label="PRIX MARQUE" align="right" icon={Euro} />
        <HeaderCell field="averagePrice" label="PRIX MOYEN" align="right" icon={Euro} />
        <HeaderCell field="margin" label="MARGE" align="right" icon={Percent} />
        <th className="w-16 px-4 py-4 bg-navy-50/80 dark:bg-navy-800/80 border-b-2 border-navy-100 dark:border-navy-700" />
      </tr>
    </thead>
  );
}