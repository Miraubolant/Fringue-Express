import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-gray-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};