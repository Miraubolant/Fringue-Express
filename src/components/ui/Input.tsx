import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          appearance-none rounded-lg relative block w-full px-3 py-2
          border border-gray-700 bg-gray-700 text-white
          placeholder-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};