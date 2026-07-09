import React from 'react';

export default function Badge({
  children,
  variant = 'default', // default | primary | success | warning | danger | info | accent
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors';
  
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
    primary: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-blue-300 dark:border-primary/30',
    accent: 'bg-accent/10 text-accent border-accent/20 dark:bg-accent/20 dark:text-cyan-300 dark:border-accent/30',
    success: 'bg-success/10 text-success border-success/20 dark:bg-success/20 dark:text-green-300 dark:border-success/30',
    warning: 'bg-warning/10 text-warning border-warning/20 dark:bg-warning/20 dark:text-yellow-300 dark:border-warning/30',
    danger: 'bg-danger/10 text-danger border-danger/20 dark:bg-danger/20 dark:text-red-300 dark:border-danger/30',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
