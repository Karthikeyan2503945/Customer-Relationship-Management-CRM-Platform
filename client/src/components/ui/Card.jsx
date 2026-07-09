import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverElevate = false,
  glass = false,
  onClick,
  ...props
}) {
  const CardComponent = onClick ? motion.div : 'div';
  
  const baseStyle = `rounded-card border bg-white text-slate-800 border-slate-100 shadow-sm transition-all duration-300 dark:bg-slate-900/50 dark:border-slate-800/80 dark:text-slate-100`;
  
  const glassStyle = glass 
    ? 'glass-light glass-card dark:glass-dark dark:shadow-none' 
    : 'shadow-md shadow-slate-100/40 dark:shadow-none';

  const motionProps = onClick && hoverElevate 
    ? { whileHover: { y: -4, scale: 1.01, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' }, whileTap: { scale: 0.99 } }
    : onClick 
      ? { whileTap: { scale: 0.995 } }
      : hoverElevate 
        ? { whileHover: { y: -4 } }
        : {};

  return (
    <CardComponent
      onClick={onClick}
      className={`${baseStyle} ${glassStyle} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
}
