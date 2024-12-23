import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { default: 1 },
  gap = '4',
  className = ''
}) => {
  const getGridCols = () => {
    const { default: defaultCols, sm, md, lg, xl } = cols;
    return `
      grid-cols-${defaultCols}
      ${sm ? `sm:grid-cols-${sm}` : ''}
      ${md ? `md:grid-cols-${md}` : ''}
      ${lg ? `lg:grid-cols-${lg}` : ''}
      ${xl ? `xl:grid-cols-${xl}` : ''}
    `;
  };

  return (
    <div className={`grid ${getGridCols()} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};