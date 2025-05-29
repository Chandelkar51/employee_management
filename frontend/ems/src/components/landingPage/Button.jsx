import React from 'react';

const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transform hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800',
    secondary: 'bg-purple-100 text-purple-800 hover:bg-purple-200 active:bg-purple-300',
    outline: 'bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 active:bg-teal-100'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;