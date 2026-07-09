import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | accent | outline | ghost | danger
  size = 'md', // sm | md | lg
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon,
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/50 shadow-md shadow-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary/50 shadow-md shadow-secondary/10 dark:bg-slate-800 dark:hover:bg-slate-700',
    accent: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent/50 shadow-md shadow-accent/20',
    outline: 'border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 focus:ring-primary/30 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
    danger: 'bg-danger text-white hover:opacity-90 focus:ring-danger/50 shadow-md shadow-danger/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-small gap-1.5',
    md: 'px-5 py-2.5 text-body gap-2',
    lg: 'px-6 py-3.5 text-lg gap-2.5',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.015, y: -0.5 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.985 } : {}}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? (
        <span className="flex items-center">{icon}</span>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
}
