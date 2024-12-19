import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  icon: Icon,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = "relative flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-200";
  
  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
    secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "text-gray-300 hover:bg-gray-700/50 focus:ring-gray-500"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement...
        </span>
      ) : (
        <span className="flex items-center">
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {children}
        </span>
      )}
    </button>
  );
};